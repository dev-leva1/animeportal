interface CacheItem<T> {
  value: T;
  timestamp: number;
  ttl: number;
}

class LRUCache<T> {
  private cache = new Map<string, CacheItem<T>>();
  private maxSize: number;
  private defaultTTL: number;

  constructor(maxSize = 100, defaultTTL = 5 * 60 * 1000) { // 5 минут по умолчанию
    this.maxSize = maxSize;
    this.defaultTTL = defaultTTL;
  }

  get(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }

    // Проверяем TTL
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    // Перемещаем в конец (LRU)
    this.cache.delete(key);
    this.cache.set(key, item);
    
    return item.value;
  }

  set(key: string, value: T, ttl?: number): void {
    // Удаляем старое значение если есть
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    // Если кэш переполнен, удаляем самый старый элемент
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }

    // Добавляем новый элемент
    this.cache.set(key, {
      value,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL
    });
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  has(key: string): boolean {
    const item = this.cache.get(key);
    
    if (!item) {
      return false;
    }

    // Проверяем TTL
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  size(): number {
    // Очищаем устаревшие элементы
    this.cleanup();
    return this.cache.size;
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.cache.delete(key);
      }
    }
  }
}

// Создаем глобальные экземпляры кэша
export const apiCache = new LRUCache<any>(50, 5 * 60 * 1000); // 5 минут для API
export const imageCache = new LRUCache<string>(200, 30 * 60 * 1000); // 30 минут для изображений
export const searchCache = new LRUCache<any>(20, 2 * 60 * 1000); // 2 минуты для поиска

export default LRUCache; 