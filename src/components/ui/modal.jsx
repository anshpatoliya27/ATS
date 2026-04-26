import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Modal({ open, onClose, children, className, size = 'md' }) {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  React.useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    if (open) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      {/* Content */}
      <div
        className={cn(
          "relative w-full mx-4 bg-white rounded-2xl shadow-2xl shadow-black/10 border border-[#E2E8F0] animate-modal-in",
          sizes[size],
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function ModalHeader({ children, onClose, className }) {
  return (
    <div className={cn("flex items-center justify-between p-6 pb-4 border-b border-[#E2E8F0]", className)}>
      <div>{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-[#64748B] hover:text-[#0F172A]"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

export function ModalBody({ children, className }) {
  return (
    <div className={cn("p-6 overflow-y-auto max-h-[calc(100vh-16rem)]", className)}>
      {children}
    </div>
  );
}

export function ModalFooter({ children, className }) {
  return (
    <div className={cn("flex items-center justify-end gap-3 p-6 pt-4 border-t border-[#E2E8F0] bg-gray-50/50 rounded-b-2xl", className)}>
      {children}
    </div>
  );
}
