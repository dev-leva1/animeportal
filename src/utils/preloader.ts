import { useState, useEffect } from 'react';

interface PreloadOptions {
  priority?: 'high' | 'low';
  crossOrigin?: 'anonymous' | 'use-credentials';
  timeout?: number;
}

class ResourcePreloader {
  private loadedResources = new Set<string>();
  private loadingPromises = new Map<string, Promise<void>>();

  // Предзагрузка изображения
  preloadImage(src: string, options: PreloadOptions = {}): Promise<void> {
    if (this.loadedResources.has(src)) {
      return Promise.resolve();
    }

    if (this.loadingPromises.has(src)) {
      return this.loadingPromises.get(src)!;
    }

    const promise = new Promise<void>((resolve, reject) => {
      const img = new Image();
      const timeoutId = options.timeout ? setTimeout(() => {
        reject(new Error(`Image preload timeout: ${src}`));
      }, options.timeout) : null;

      img.onload = () => {
        if (timeoutId) clearTimeout(timeoutId);
        this.loadedResources.add(src);
        this.loadingPromises.delete(src);
        resolve();
      };

      img.onerror = () => {
        if (timeoutId) clearTimeout(timeoutId);
        this.loadingPromises.delete(src);
        reject(new Error(`Failed to preload image: ${src}`));
      };

      if (options.crossOrigin) {
        img.crossOrigin = options.crossOrigin;
      }

      img.src = src;
    });

    this.loadingPromises.set(src, promise);
    return promise;
  }

  // Предзагрузка нескольких изображений
  preloadImages(sources: string[], options: PreloadOptions = {}): Promise<void[]> {
    return Promise.all(sources.map(src => this.preloadImage(src, options)));
  }

  // Предзагрузка CSS
  preloadCSS(href: string): Promise<void> {
    if (this.loadedResources.has(href)) {
      return Promise.resolve();
    }

    if (this.loadingPromises.has(href)) {
      return this.loadingPromises.get(href)!;
    }

    const promise = new Promise<void>((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;

      link.onload = () => {
        this.loadedResources.add(href);
        this.loadingPromises.delete(href);
        resolve();
      };

      link.onerror = () => {
        this.loadingPromises.delete(href);
        reject(new Error(`Failed to preload CSS: ${href}`));
      };

      document.head.appendChild(link);
    });

    this.loadingPromises.set(href, promise);
    return promise;
  }

  // Предзагрузка JavaScript
  preloadScript(src: string): Promise<void> {
    if (this.loadedResources.has(src)) {
      return Promise.resolve();
    }

    if (this.loadingPromises.has(src)) {
      return this.loadingPromises.get(src)!;
    }

    const promise = new Promise<void>((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'script';
      link.href = src;

      link.onload = () => {
        this.loadedResources.add(src);
        this.loadingPromises.delete(src);
        resolve();
      };

      link.onerror = () => {
        this.loadingPromises.delete(src);
        reject(new Error(`Failed to preload script: ${src}`));
      };

      document.head.appendChild(link);
    });

    this.loadingPromises.set(src, promise);
    return promise;
  }

  // Предзагрузка страницы (prefetch)
  prefetchPage(href: string): void {
    if (this.loadedResources.has(href)) {
      return;
    }

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
    
    this.loadedResources.add(href);
  }

  // Проверка, загружен ли ресурс
  isLoaded(src: string): boolean {
    return this.loadedResources.has(src);
  }

  // Очистка кэша
  clear(): void {
    this.loadedResources.clear();
    this.loadingPromises.clear();
  }
}

// Создаем глобальный экземпляр
export const preloader = new ResourcePreloader();

// Хук для предзагрузки изображений
export const useImagePreloader = (sources: string[], enabled = true) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!enabled || sources.length === 0) return;

    let isMounted = true;

    preloader.preloadImages(sources)
      .then(() => {
        if (isMounted) {
          setLoaded(true);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [sources, enabled]);

  return { loaded, error };
};

export default preloader; 