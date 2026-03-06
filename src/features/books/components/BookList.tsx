import React, { useMemo, useState } from 'react';
import type { Book } from '../../../@types';
import { ConfirmDialog } from '../../../components/ui/ConfirmDialog';

interface BookListProps {
  books: Book[];
  onEdit: (id: string | number) => void;
  onDelete: (id: string | number) => void;
  onAdd: () => void;
  loading?: boolean;
}

export const BookList: React.FC<BookListProps> = ({
  books,
  onEdit,
  onDelete,
  onAdd,
  loading = false,
}) => {
  const [deleteId, setDeleteId] = useState<string | number | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState<Set<string | number>>(new Set());
  const pageSize = 5;

  const toggleRow = (id: string | number) => {
    const next = new Set(expandedRows);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpandedRows(next);
  };
  const openConfirm = (id: string | number) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };
  const handleConfirm = async () => {
    if (!deleteId) return;
    setConfirmLoading(true);
    await onDelete(deleteId);
    setConfirmLoading(false);
    setConfirmOpen(false);
    setDeleteId(null);
  };
  const handleCancel = () => {
    setConfirmOpen(false);
    setDeleteId(null);
  };
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return books.filter((b) => {
      if (!q) return true;
      const t = b.title?.toLowerCase() ?? '';
      const i = b.isbn?.toLowerCase() ?? '';
      const a = (b.author?.name || '').toLowerCase();
      const g = (b.genre?.name || '').toLowerCase();
      return t.includes(q) || i.includes(q) || a.includes(q) || g.includes(q);
    });
  }, [books, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const visible = filtered.slice(start, start + pageSize);

  if (loading) {
    return <div className="loading">Carregando livros...</div>;
  }

  return (
    <div className="book-list">
      <div className="list-header">
        <h2>Livros</h2>
        <button onClick={onAdd} className="btn btn-primary">
          Adicionar Livro
        </button>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          className="form-control"
          placeholder="Pesquisar por livro, autor ou gênero"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          style={{ maxWidth: 420, flex: '1 1 280px' }}
        />
        {query && (
          <button
            className="btn btn-secondary"
            onClick={() => {
              setQuery('');
              setPage(1);
            }}
          >
            Limpar
          </button>
        )}
      </div>

      <div className="table-card table-responsive">
        {(!filtered || filtered.length === 0) ? (
          <p className="empty-message">Nenhum livro encontrado. Crie um para começar.</p>
        ) : (
          <table className="table table-clean table-hover">
            <thead>
              <tr>
                <th>Livro</th>
                <th>ISBN</th>
                <th>Publicação</th>
                <th>Autor / Gênero</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((row) => {
                const isExpanded = expandedRows.has(row.id);
                const hasDescription = !!row.description?.trim();

                return (
                  <React.Fragment key={row.id}>
                    <tr>
                      <td className="col-title">
                        <div className="title-wrapper">
                          <span className="book-title">{row.title}</span>
                          {hasDescription && (
                            <button
                              className="btn-toggle-desc"
                              onClick={() => toggleRow(row.id)}
                              title={isExpanded ? 'Ocultar descrição' : 'Ver descrição'}
                            >
                              {isExpanded ? '−' : '+'}
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="col-isbn">
                        <code className="isbn-code">{row.isbn}</code>
                      </td>
                      <td className="col-date">
                        {row.publishDate ? new Date(row.publishDate).toLocaleDateString() : '-'}
                      </td>
                      <td className="col-tags">
                        <div className="tag-group">
                          <span className="badge badge-author">{row.author?.name || '-'}</span>
                          <span className="badge badge-genre">{row.genre?.name || '-'}</span>
                        </div>
                      </td>
                      <td className="actions">
                        <button onClick={() => onEdit(row.id)} className="btn-icon" title="Editar">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4L18.5 2.5z"></path></svg>
                        </button>
                        <button onClick={() => openConfirm(row.id)} className="btn-icon btn-icon-danger" title="Excluir">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </button>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr className="description-row">
                        <td colSpan={5}>
                          <div className="description-content">
                            <strong>Sinopse:</strong>
                            <p>{row.description}</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      {filtered.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem' }}>
          <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>
            Exibindo {start + 1}-{Math.min(start + pageSize, filtered.length)} de {filtered.length}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <span style={{ minWidth: 80, textAlign: 'center' }}>
              Página {currentPage} de {totalPages}
            </span>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Próxima
            </button>
          </div>
        </div>
      )}
      <ConfirmDialog
        open={confirmOpen}
        title="Confirmar exclusão"
        message="Tem certeza que deseja excluir este registro?"
        confirmText="Excluir"
        cancelText="Cancelar"
        loading={confirmLoading}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
};
