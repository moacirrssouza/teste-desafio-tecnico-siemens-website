import React, { useEffect } from 'react';

interface FormModalProps {
  open: boolean;
  title?: string;
  onCancel: () => void;
  children: React.ReactNode;
  maxWidth?: number;
  messages?: React.ReactNode;
}

export const FormModal: React.FC<FormModalProps> = ({
  open,
  title,
  onCancel,
  children,
  maxWidth = 640,
  messages,
}) => {
  useEffect(() => {
    if (open) {
      document.body.classList.add('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div
        className="modal"
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {title && (
          <div className="modal-header">
            <h3>{title}</h3>
          </div>
        )}
        <div className="modal-body">
          {messages && <div className="modal-messages" style={{ marginBottom: 12 }}>{messages}</div>}
          {children}
        </div>
      </div>
    </div>
  );
};
