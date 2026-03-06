import React, { useEffect, useMemo, useState } from 'react';
import { FormModal } from '../../../components/ui/FormModal';
import { isValidISBN, bookValidation } from '../../../@types';
import type { Book } from '../../../@types';
 
interface BookFormModalProps {
  open: boolean;
  variant?: 'modal' | 'inline';
  title?: string;
  book?: Book | null;
  existingIsbns?: string[];
  onSubmit: (data: {
    title: string;
    authorName: string;
    genreName: string;
    isbn: string;
    publishedDate: string;
    pages?: number;
    description: string;
  }) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
  error?: string | null;
  successMessage?: string | null;
}

export const BookFormModal: React.FC<BookFormModalProps> = ({
  open,
  variant = 'modal',
  title = 'Cadastro de Livro',
  book,
  existingIsbns = [],
  onSubmit,
  onCancel,
  loading = false,
  error = null,
  successMessage = null,
}) => {
  useEffect(() => {
    if (variant === 'modal' && open) {
      document.body.classList.add('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [open, variant]);
  const initialValues: {
    title: string;
    authorName: string;
    genreName: string;
    isbn: string;
    publishedDate: string;
    pages?: number;
    description: string;
  } = useMemo(() => {
    return book
      ? {
          title: book.title,
          isbn: book.isbn,
          publishedDate: book.publishDate ? new Date(book.publishDate).toISOString().split('T')[0] : '',
          authorName: String(book.author?.name ?? ''),
          genreName: String(book.genre?.name ?? ''),
          pages: typeof (book as any).pages === 'number' ? (book as any).pages : undefined,
          description: book.description || '',
        }
      : {
          title: '',
          isbn: '',
          publishedDate: '',
          authorName: '',
          genreName: '',
          pages: undefined,
          description: '',
        };
  }, [book]);

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);
  const titlePattern = "^[A-Za-zÀ-ÖØ-öø-ÿ0-9\\s\\-':,.;!?()]+$";
  const namePattern = "^[A-Za-zÀ-ÖØ-öø-ÿ\\s\\-']+$";

  const validate = (values: typeof initialValues) => {
    const errors: Record<string, string> = {};
    const normalize = (s: string) => s.replace(/[^0-9A-Za-z]/g, '').toLowerCase();
    // Título
    if (!values.title || values.title.trim().length < bookValidation.title.min) {
      errors.title = `Título deve ter pelo menos ${bookValidation.title.min} caracteres`;
    }
    if (values.title && values.title.length > bookValidation.title.max) {
      errors.title = `Título deve ter no máximo ${bookValidation.title.max} caracteres`;
    }
    // Autor/Gênero
    if (!values.authorName || values.authorName.trim().length < 2) {
      errors.authorName = 'Autor é obrigatório';
    }
    if (!values.genreName || values.genreName.trim().length < 2) {
      errors.genreName = 'Gênero é obrigatório';
    }
    // ISBN
    if (!values.isbn) {
      errors.isbn = 'ISBN é obrigatório';
    } else if (!isValidISBN(values.isbn)) {
      errors.isbn = 'ISBN deve conter apenas números e hífens';
    } else {
      const normSet = new Set(existingIsbns.map((i) => normalize(i)));
      const current = normalize(values.isbn);
      if (!book && normSet.has(current)) {
        errors.isbn = 'ISBN já cadastrado para outro livro';
      }
    }
    // Data
    if (!values.publishedDate) {
      errors.publishedDate = 'Data é obrigatória';
    } else {
      const d = new Date(values.publishedDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (isNaN(d.getTime())) {
        errors.publishedDate = 'Data inválida';
      } else if (d > today) {
        errors.publishedDate = 'Data não pode ser no futuro';
      }
    }
    // Páginas: obrigatório em criação e edição
    if (values.pages === undefined || Number(values.pages) <= 0) {
      errors.pages = 'Número de páginas deve ser maior que zero';
    }
    // Descrição
    if (!values.description || values.description.trim().length < 10) {
      errors.description = 'Descrição deve ter pelo menos 10 caracteres';
    } else if (values.description.length > 500) {
      errors.description = 'Descrição deve ter no máximo 500 caracteres';
    }
    return errors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (name === 'pages') {
      const num = value === '' ? undefined : Math.max(0, Number(value));
      setValues((prev) => ({ ...prev, pages: num }));
    } else if (name === 'isbn') {
      const sanitized = value.replace(/[^\d-]/g, '');
      setValues((prev) => ({ ...prev, isbn: sanitized }));
      if (!book) {
        const normalize = (s: string) => s.replace(/[^0-9A-Za-z]/g, '').toLowerCase();
        const normSet = new Set(existingIsbns.map((i) => normalize(i)));
        const current = normalize(sanitized);
        if (sanitized && normSet.has(current)) {
          setErrors((prev) => ({ ...prev, isbn: 'ISBN já cadastrado para outro livro' }));
        } else if (errors.isbn === 'ISBN já cadastrado para outro livro') {
          const next = { ...errors };
          delete next.isbn;
          setErrors(next);
        }
      }
    } else {
      setValues((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      const next = { ...errors };
      delete next[name];
      setErrors(next);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      try {
        await onSubmit(values);
      } catch (err: any) {
        const apiErrors: Record<string, string[]> | undefined = err?.response?.data?.errors;
        if (apiErrors && typeof apiErrors === 'object') {
          const mapped: Record<string, string> = {};
          const mapKey = (k: string) => {
            const key = k.toLowerCase();
            if (key.includes('title')) return 'title';
            if (key.includes('isbn')) return 'isbn';
            if (key.includes('publishdate')) return 'publishedDate';
            if (key.includes('author')) return 'authorName';
            if (key.includes('genre')) return 'genreName';
            if (key.includes('page')) return 'pages';
            if (key.includes('description')) return 'description';
            return k;
          };
          Object.entries(apiErrors).forEach(([field, msgs]) => {
            const target = mapKey(field);
            if (Array.isArray(msgs) && msgs.length > 0) {
              mapped[target] = msgs[0];
            }
          });
          if (Object.keys(mapped).length > 0) {
            setErrors(mapped);
            return;
          }
        }
        throw err;
      }
    }
  };

  const alerts = (
    <>
      {error && <div className="alert alert-error">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
    </>
  );

  const form = (
    <form onSubmit={handleSubmit} className="form">
      {variant !== 'modal' && alerts}

      <div className="form-group form-group--full">
        <label htmlFor="isbn">ISBN<span className="required"> *</span></label>
        <input
          id="isbn"
          name="isbn"
          type="text"
          className={`form-control ${errors.isbn ? 'is-invalid' : ''}`}
          value={values.isbn}
          onChange={handleChange}
          disabled={loading}
          readOnly={!!book}
          placeholder="978-3-16-148410-0"
          maxLength={17}
          inputMode="numeric"
          required
        />
        {errors.isbn && <span className="error-message">{errors.isbn}</span>}
      </div>

      <div className="form-group form-group--full">
        <label htmlFor="title">Título<span className="required"> *</span></label>
        <input
          id="title"
          name="title"
          type="text"
          className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          value={values.title}
          onChange={handleChange}
          disabled={loading}
          placeholder="Ex: 1984, O Senhor dos Anéis..."
          pattern={titlePattern}
          maxLength={200}
          required
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="pages">Número de Páginas<span className="required"> *</span></label>
        <input
          id="pages"
          name="pages"
          type="number"
          className={`form-control ${errors.pages ? 'is-invalid' : ''}`}
          value={values.pages ?? ''}
          onChange={handleChange}
          disabled={loading}
          placeholder="320"
          min={1}
          step={1}
          inputMode="numeric"
          required
        />
        {errors.pages && <span className="error-message">{errors.pages}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="authorName">Autor<span className="required"> *</span></label>
        <input
          id="authorName"
          name="authorName"
          type="text"
          className={`form-control ${errors.authorName ? 'is-invalid' : ''}`}
          value={values.authorName}
          onChange={handleChange}
          disabled={loading}
          placeholder="Digite o nome do autor"
          pattern={namePattern}
          maxLength={100}
          required
        />
        {errors.authorName && <span className="error-message">{errors.authorName}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="genreName">Gênero<span className="required"> *</span></label>
        <input
          id="genreName"
          name="genreName"
          type="text"
          className={`form-control ${errors.genreName ? 'is-invalid' : ''}`}
          value={values.genreName}
          onChange={handleChange}
          disabled={loading}
          placeholder="Digite o nome do gênero"
          pattern={namePattern}
          maxLength={100}
          required
        />
        {errors.genreName && <span className="error-message">{errors.genreName}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="publishedDate">Data de Publicação<span className="required"> *</span></label>
        <input
          id="publishedDate"
          name="publishedDate"
          type="date"
          className={`form-control ${errors.publishedDate ? 'is-invalid' : ''}`}
          value={values.publishedDate}
          onChange={handleChange}
          disabled={loading}
          readOnly={!!book}
          placeholder="dd/mm/aaaa"
          max={todayStr}
          required
        />
        {errors.publishedDate && <span className="error-message">{errors.publishedDate}</span>}
      </div>

      <div className="form-group form-group--full">
        <label htmlFor="description">Sinopse<span className="required"> *</span></label>
        <textarea
          id="description"
          name="description"
          className={`form-control ${errors.description ? 'is-invalid' : ''}`}
          value={values.description}
          onChange={handleChange}
          disabled={loading}
          placeholder="Digite uma breve sinopse ou descrição do livro..."
          rows={5}
          maxLength={500}
          required
        />
        {errors.description && <span className="error-message">{errors.description}</span>}
      </div>

      {variant !== 'modal' && <hr className="form-divider" />}
      <div className={variant === 'modal' ? 'modal-actions' : 'modal-actions modal-actions--split'}>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Salvando...' : (book ? 'Atualizar Livro' : 'Salvar Livro')}
        </button>
      </div>
    </form>
  );

  if (variant === 'inline') {
    return (
      <div>
        <div className="list-header">
          <h2>{title}</h2>
        </div>
        {form}
      </div>
    );
  }

  return (
    <FormModal open={open} title={title} onCancel={onCancel} maxWidth={640} messages={alerts}>
      {form}
    </FormModal>
  );
}
