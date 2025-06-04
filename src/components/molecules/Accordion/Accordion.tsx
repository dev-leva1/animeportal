import React, { 
  createContext, 
  useContext, 
  useState, 
  useCallback, 
  ReactNode,
  useRef,
  useEffect
} from 'react';
import clsx from 'clsx';

interface AccordionContextValue {
  openItems: Set<string>;
  toggleItem: (itemId: string) => void;
  type: 'single' | 'multiple';
  accordionId: string;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion compound components must be used within Accordion.Root');
  }
  return context;
};

interface AccordionRootProps {
  children: ReactNode;
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  className?: string;
}

const AccordionRoot: React.FC<AccordionRootProps> = ({
  children,
  type = 'single',
  defaultValue,
  value: controlledValue,
  onValueChange,
  className
}) => {
  const getInitialItems = (): Set<string> => {
    if (defaultValue) {
      return new Set(Array.isArray(defaultValue) ? defaultValue : [defaultValue]);
    }
    return new Set();
  };

  const [internalItems, setInternalItems] = useState<Set<string>>(getInitialItems);
  const isControlled = controlledValue !== undefined;
  const accordionId = React.useId();

  const openItems = isControlled 
    ? new Set(Array.isArray(controlledValue) ? controlledValue : controlledValue ? [controlledValue] : [])
    : internalItems;

  const toggleItem = useCallback((itemId: string) => {
    const newItems = new Set(openItems);
    
    if (type === 'single') {
      // В single режиме может быть открыт только один элемент
      if (newItems.has(itemId)) {
        newItems.clear();
      } else {
        newItems.clear();
        newItems.add(itemId);
      }
    } else {
      // В multiple режиме можно открывать/закрывать любые элементы
      if (newItems.has(itemId)) {
        newItems.delete(itemId);
      } else {
        newItems.add(itemId);
      }
    }

    if (!isControlled) {
      setInternalItems(newItems);
    }

    // Вызываем callback с правильным форматом
    const newValue = Array.from(newItems);
    onValueChange?.(type === 'single' ? (newValue[0] || '') : newValue);
  }, [openItems, type, isControlled, onValueChange]);

  const contextValue: AccordionContextValue = {
    openItems,
    toggleItem,
    type,
    accordionId
  };

  return (
    <AccordionContext.Provider value={contextValue}>
      <div className={clsx('accordion-root', className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps {
  children: ReactNode;
  value: string;
  className?: string;
  disabled?: boolean;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ 
  children, 
  value, 
  className,
  disabled = false 
}) => {
  const { accordionId } = useAccordion();

  return (
    <div 
      className={clsx(
        'accordion-item',
        'border border-gray-200 dark:border-gray-700 rounded-lg mb-2',
        {
          'opacity-50 pointer-events-none': disabled
        },
        className
      )}
      data-value={value}
      data-accordion-id={accordionId}
    >
      {children}
    </div>
  );
};

interface AccordionTriggerProps {
  children: ReactNode;
  value: string;
  className?: string;
}

const AccordionTrigger: React.FC<AccordionTriggerProps> = ({ 
  children, 
  value, 
  className 
}) => {
  const { openItems, toggleItem, accordionId } = useAccordion();
  const isOpen = openItems.has(value);

  const handleClick = useCallback(() => {
    toggleItem(value);
  }, [toggleItem, value]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleItem(value);
    }
  }, [toggleItem, value]);

  return (
    <button
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-expanded={isOpen}
      aria-controls={`${accordionId}-${value}-content`}
      id={`${accordionId}-${value}-trigger`}
      className={clsx(
        'accordion-trigger',
        'w-full flex items-center justify-between p-4 text-left',
        'text-gray-900 dark:text-gray-100 font-medium',
        'hover:bg-gray-50 dark:hover:bg-gray-800',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        'transition-colors',
        className
      )}
    >
      <span>{children}</span>
      <svg
        className={clsx(
          'w-5 h-5 transform transition-transform duration-200',
          {
            'rotate-180': isOpen
          }
        )}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
};

interface AccordionContentProps {
  children: ReactNode;
  value: string;
  className?: string;
}

const AccordionContent: React.FC<AccordionContentProps> = ({ 
  children, 
  value, 
  className 
}) => {
  const { openItems, accordionId } = useAccordion();
  const isOpen = openItems.has(value);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | 'auto'>(0);

  // Анимация высоты
  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        const scrollHeight = contentRef.current.scrollHeight;
        setHeight(scrollHeight);
        // После завершения анимации устанавливаем auto для dynamic content
        const timer = setTimeout(() => setHeight('auto'), 200);
        return () => clearTimeout(timer);
      } else {
        setHeight(0);
      }
    }
  }, [isOpen]);

  return (
    <div
      ref={contentRef}
      role="region"
      aria-labelledby={`${accordionId}-${value}-trigger`}
      id={`${accordionId}-${value}-content`}
      className={clsx(
        'accordion-content',
        'overflow-hidden transition-all duration-200 ease-in-out',
        className
      )}
      style={{ height: height === 'auto' ? 'auto' : `${height}px` }}
    >
      <div className="p-4 pt-0 text-gray-700 dark:text-gray-300">
        {children}
      </div>
    </div>
  );
};

// Compound component export
export const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent
};

export type {
  AccordionRootProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps
}; 