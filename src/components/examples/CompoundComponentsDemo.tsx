import React, { useState } from 'react';
import { Tabs, Modal, Accordion } from '../molecules';
import { Button } from '../atoms';

/**
 * Демонстрационный компонент для показа работы Compound Components
 * Используется для тестирования и документации
 */
export const CompoundComponentsDemo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
        Compound Components Demo
      </h1>

      {/* Tabs Demo */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Tabs Component
        </h2>
        
        <Tabs.Root defaultValue="overview" className="w-full">
          <Tabs.List>
            <Tabs.Trigger value="overview">Обзор</Tabs.Trigger>
            <Tabs.Trigger value="features">Функции</Tabs.Trigger>
            <Tabs.Trigger value="api">API</Tabs.Trigger>
            <Tabs.Trigger value="examples" disabled>
              Примеры (отключено)
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="overview">
            <h3 className="text-lg font-medium mb-3">Обзор</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Tabs - это составной компонент для создания переключаемых панелей контента.
              Поддерживает keyboard navigation, accessibility и flexible styling.
            </p>
          </Tabs.Content>

          <Tabs.Content value="features">
            <h3 className="text-lg font-medium mb-3">Основные функции</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
              <li>Полная accessibility поддержка (ARIA attributes)</li>
              <li>Keyboard navigation (Arrow keys, Home, End)</li>
              <li>Controlled и uncontrolled режимы</li>
              <li>Гибкая кастомизация стилей</li>
              <li>TypeScript поддержка</li>
            </ul>
          </Tabs.Content>

          <Tabs.Content value="api">
            <h3 className="text-lg font-medium mb-3">API</h3>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <pre className="text-sm text-gray-800 dark:text-gray-200">
{`<Tabs.Root defaultValue="tab1" onValueChange={setValue}>
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">Content 1</Tabs.Content>
  <Tabs.Content value="tab2">Content 2</Tabs.Content>
</Tabs.Root>`}
              </pre>
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </section>

      {/* Modal Demo */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Modal Component
        </h2>
        
        <Modal.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
          <Modal.Trigger asChild>
            <Button variant="primary">Открыть модальное окно</Button>
          </Modal.Trigger>
          
          <Modal.Content className="max-w-lg">
            <Modal.Header>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Заголовок модального окна
              </h3>
            </Modal.Header>
            
            <Modal.Body>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Это пример содержимого модального окна. Modal компонент поддерживает:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                <li>Portal rendering для правильного z-index</li>
                <li>Focus trap для accessibility</li>
                <li>Escape key для закрытия</li>
                <li>Click outside для закрытия</li>
                <li>Body scroll prevention</li>
              </ul>
            </Modal.Body>
            
            <Modal.Footer>
              <Modal.Close>Отмена</Modal.Close>
              <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                Подтвердить
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal.Root>
      </section>

      {/* Accordion Demo */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Accordion Component
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Single Mode */}
          <div>
            <h3 className="text-lg font-medium mb-3">Single Mode</h3>
            <Accordion.Root type="single" defaultValue="item-1">
              <Accordion.Item value="item-1">
                <Accordion.Trigger value="item-1">
                  Что такое Compound Components?
                </Accordion.Trigger>
                <Accordion.Content value="item-1">
                  Compound Components - это паттерн проектирования React компонентов,
                  где несколько компонентов работают вместе для создания единого интерфейса.
                  Они обеспечивают гибкость и переиспользуемость.
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="item-2">
                <Accordion.Trigger value="item-2">
                  Преимущества подхода
                </Accordion.Trigger>
                <Accordion.Content value="item-2">
                  - Чистый и декларативный API<br/>
                  - Гибкость в использовании<br/>
                  - Легкость кастомизации<br/>
                  - Переиспользуемость компонентов
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="item-3">
                <Accordion.Trigger value="item-3">
                  Accessibility
                </Accordion.Trigger>
                <Accordion.Content value="item-3">
                  Компонент полностью поддерживает accessibility стандарты:
                  ARIA attributes, keyboard navigation, screen reader support.
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          </div>

          {/* Multiple Mode */}
          <div>
            <h3 className="text-lg font-medium mb-3">Multiple Mode</h3>
            <Accordion.Root type="multiple" defaultValue={['faq-1', 'faq-3']}>
              <Accordion.Item value="faq-1">
                <Accordion.Trigger value="faq-1">
                  Можно ли открыть несколько элементов?
                </Accordion.Trigger>
                <Accordion.Content value="faq-1">
                  Да! В multiple режиме можно открыть любое количество элементов одновременно.
                  Это полезно для FAQ секций или когда нужно сравнить информацию.
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="faq-2">
                <Accordion.Trigger value="faq-2">
                  Поддерживаются ли анимации?
                </Accordion.Trigger>
                <Accordion.Content value="faq-2">
                  Конечно! Компонент включает плавные анимации открытия/закрытия
                  с автоматическим расчетом высоты контента.
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="faq-3">
                <Accordion.Trigger value="faq-3">
                  Как насчет кастомизации?
                </Accordion.Trigger>
                <Accordion.Content value="faq-3">
                  Каждый sub-компонент принимает className prop для полной кастомизации.
                  Также поддерживаются CSS переменные для быстрых изменений темы.
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          </div>
        </div>
      </section>

      {/* Usage Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Примеры использования
        </h2>
        
        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
          <h3 className="text-lg font-medium mb-3">Код примеров</h3>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm text-gray-800 dark:text-gray-200">
{`// Tabs usage
<Tabs.Root defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">Content</Tabs.Content>
</Tabs.Root>

// Modal usage  
<Modal.Root>
  <Modal.Trigger>Open</Modal.Trigger>
  <Modal.Content>
    <Modal.Header>Title</Modal.Header>
    <Modal.Body>Content</Modal.Body>
    <Modal.Footer>
      <Modal.Close>Close</Modal.Close>
    </Modal.Footer>
  </Modal.Content>
</Modal.Root>

// Accordion usage
<Accordion.Root type="single">
  <Accordion.Item value="item1">
    <Accordion.Trigger value="item1">Question</Accordion.Trigger>
    <Accordion.Content value="item1">Answer</Accordion.Content>
  </Accordion.Item>
</Accordion.Root>`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}; 