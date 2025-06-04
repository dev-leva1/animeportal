import React, { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  useCallback, 
  ReactNode,
  useRef
} from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';

interface ModalContextValue {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  modalId: string;
}

const ModalContext = createContext<ModalContextValue | null>(null);

const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Modal compound components must be used within Modal.Root');
  }
  return context;
};

// Focus trap hook for accessibility
const useFocusTrap = (isOpen: boolean, ref: React.RefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    if (!isOpen || !ref.current) return;

    const element = ref.current;
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    element.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      element.removeEventListener('keydown', handleTabKey);
    };
  }, [isOpen, ref]);
};

interface ModalRootProps {
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const ModalRoot: React.FC<ModalRootProps> = ({
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const modalId = React.useId();

  const openModal = useCallback(() => {
    if (!isControlled) {
      setInternalOpen(true);
    }
    onOpenChange?.(true);
  }, [isControlled, onOpenChange]);

  const closeModal = useCallback(() => {
    if (!isControlled) {
      setInternalOpen(false);
    }
    onOpenChange?.(false);
  }, [isControlled, onOpenChange]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeModal]);

  const contextValue: ModalContextValue = {
    isOpen,
    openModal,
    closeModal,
    modalId
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

interface ModalTriggerProps {
  children: ReactNode;
  asChild?: boolean;
  className?: string;
}

const ModalTrigger: React.FC<ModalTriggerProps> = ({ 
  children, 
  asChild = false,
  className 
}) => {
  const { openModal } = useModal();

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...(children.props as any),
      onClick: (e: React.MouseEvent) => {
        (children.props as any).onClick?.(e);
        openModal();
      }
    });
  }

  return (
    <button
      type="button"
      onClick={openModal}
      className={clsx(
        'modal-trigger',
        'px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        'transition-colors',
        className
      )}
    >
      {children}
    </button>
  );
};

interface ModalContentProps {
  children: ReactNode;
  className?: string;
  showCloseButton?: boolean;
}

const ModalContent: React.FC<ModalContentProps> = ({ 
  children, 
  className,
  showCloseButton = true
}) => {
  const { isOpen, closeModal, modalId } = useModal();
  const contentRef = useRef<HTMLDivElement>(null);

  useFocusTrap(isOpen, contentRef);

  if (!isOpen) return null;

  const modalContent = (
    <div 
      className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeModal();
        }
      }}
    >
      <div
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${modalId}-title`}
        aria-describedby={`${modalId}-description`}
        className={clsx(
          'modal-content',
          'relative w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl',
          'transform transition-all duration-200',
          'max-h-[90vh] overflow-y-auto',
          className
        )}
      >
        {showCloseButton && (
          <button
            type="button"
            onClick={closeModal}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Закрыть модальное окно"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        {children}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

interface ModalHeaderProps {
  children: ReactNode;
  className?: string;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ children, className }) => {
  const { modalId } = useModal();

  return (
    <div 
      id={`${modalId}-title`}
      className={clsx(
        'modal-header',
        'px-6 py-4 border-b border-gray-200 dark:border-gray-700',
        className
      )}
    >
      {children}
    </div>
  );
};

interface ModalBodyProps {
  children: ReactNode;
  className?: string;
}

const ModalBody: React.FC<ModalBodyProps> = ({ children, className }) => {
  const { modalId } = useModal();

  return (
    <div 
      id={`${modalId}-description`}
      className={clsx('modal-body', 'px-6 py-4', className)}
    >
      {children}
    </div>
  );
};

interface ModalFooterProps {
  children: ReactNode;
  className?: string;
}

const ModalFooter: React.FC<ModalFooterProps> = ({ children, className }) => {
  return (
    <div 
      className={clsx(
        'modal-footer',
        'px-6 py-4 border-t border-gray-200 dark:border-gray-700',
        'flex gap-3 justify-end',
        className
      )}
    >
      {children}
    </div>
  );
};

interface ModalCloseProps {
  children: ReactNode;
  asChild?: boolean;
  className?: string;
}

const ModalClose: React.FC<ModalCloseProps> = ({ 
  children, 
  asChild = false,
  className 
}) => {
  const { closeModal } = useModal();

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...(children.props as any),
      onClick: (e: React.MouseEvent) => {
        (children.props as any).onClick?.(e);
        closeModal();
      }
    });
  }

  return (
    <button
      type="button"
      onClick={closeModal}
      className={clsx(
        'modal-close',
        'px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200',
        'rounded-md hover:bg-gray-300 dark:hover:bg-gray-500',
        'focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
        'transition-colors',
        className
      )}
    >
      {children}
    </button>
  );
};

// Compound component export
export const Modal = {
  Root: ModalRoot,
  Trigger: ModalTrigger,
  Content: ModalContent,
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
  Close: ModalClose
};

export type {
  ModalRootProps,
  ModalTriggerProps,
  ModalContentProps,
  ModalHeaderProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalCloseProps
}; 