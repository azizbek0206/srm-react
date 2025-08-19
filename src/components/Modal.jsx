import { useEffect } from 'react';
import Button from './Button';

function Modal({ isOpen, onClose, title, children }) {
  // Close modal on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-primary">{title}</h2>
          <button onClick={onClose} className="text-gray hover:text-primary">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;