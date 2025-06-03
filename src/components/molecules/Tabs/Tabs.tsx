import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { clsx } from 'clsx';

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  tabsId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs compound components must be used within Tabs.Root');
  }
  return context;
};

interface TabsRootProps {
  children: ReactNode;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

const TabsRoot: React.FC<TabsRootProps> = ({
  children,
  defaultValue = '',
  value: controlledValue,
  onValueChange,
  className
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const activeTab = isControlled ? controlledValue : internalValue;
  const tabsId = React.useId();

  const setActiveTab = useCallback((tabId: string) => {
    if (!isControlled) {
      setInternalValue(tabId);
    }
    onValueChange?.(tabId);
  }, [isControlled, onValueChange]);

  const contextValue: TabsContextValue = {
    activeTab,
    setActiveTab,
    tabsId
  };

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={clsx('tabs-root', className)} data-orientation="horizontal">
        {children}
      </div>
    </TabsContext.Provider>
  );
};

interface TabsListProps {
  children: ReactNode;
  className?: string;
}

const TabsList: React.FC<TabsListProps> = ({ children, className }) => {
  const { tabsId } = useTabs();

  return (
    <div
      role="tablist"
      aria-labelledby={`${tabsId}-label`}
      className={clsx(
        'tabs-list',
        'flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg',
        className
      )}
    >
      {children}
    </div>
  );
};

interface TabsTriggerProps {
  children: ReactNode;
  value: string;
  className?: string;
  disabled?: boolean;
}

const TabsTrigger: React.FC<TabsTriggerProps> = ({
  children,
  value,
  className,
  disabled = false
}) => {
  const { activeTab, setActiveTab, tabsId } = useTabs();
  const isActive = activeTab === value;

  const handleClick = useCallback(() => {
    if (!disabled) {
      setActiveTab(value);
    }
  }, [disabled, setActiveTab, value]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!disabled) {
        setActiveTab(value);
      }
    }
  }, [disabled, setActiveTab, value]);

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={`${tabsId}-${value}-content`}
      id={`${tabsId}-${value}-trigger`}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={clsx(
        'tabs-trigger',
        'px-3 py-2 text-sm font-medium rounded-md transition-all',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        {
          'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm': isActive,
          'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100': !isActive && !disabled,
          'opacity-50 cursor-not-allowed': disabled
        },
        className
      )}
    >
      {children}
    </button>
  );
};

interface TabsContentProps {
  children: ReactNode;
  value: string;
  className?: string;
}

const TabsContent: React.FC<TabsContentProps> = ({ children, value, className }) => {
  const { activeTab, tabsId } = useTabs();
  const isActive = activeTab === value;

  if (!isActive) {
    return null;
  }

  return (
    <div
      role="tabpanel"
      aria-labelledby={`${tabsId}-${value}-trigger`}
      id={`${tabsId}-${value}-content`}
      tabIndex={0}
      className={clsx(
        'tabs-content',
        'mt-4 p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        className
      )}
    >
      {children}
    </div>
  );
};

// Compound component export
export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent
};

export type {
  TabsRootProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps
}; 