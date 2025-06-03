import { useState, useEffect, useCallback, useRef } from 'react';
import { apiCache } from '../utils/cache';

interface UseApiOptions {
  cacheKey?: string;
  cacheTTL?: number;
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
  retryCount?: number;
  retryDelay?: number;
}

interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  mutate: (newData: T) => void;
}

export const useApi = <T>(
  apiCall: () => Promise<T>,
  options: UseApiOptions = {}
): UseApiReturn<T> => {
  const {
    cacheKey,
    cacheTTL,
    enabled = true,
    refetchOnWindowFocus = false,
    retryCount = 0,
    retryDelay = 1000
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const retryCountRef = useRef(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async (isRetry = false) => {
    if (!enabled) return;

    // Проверяем кэш
    if (cacheKey && !isRetry) {
      const cachedData = apiCache.get(cacheKey);
      if (cachedData) {
        setData(cachedData);
        return;
      }
    }

    // Отменяем предыдущий запрос
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    setLoading(true);
    setError(null);

    try {
      const result = await apiCall();
      
      // Сохраняем в кэш
      if (cacheKey) {
        apiCache.set(cacheKey, result, cacheTTL);
      }
      
      setData(result);
      retryCountRef.current = 0;
    } catch (err) {
      const error = err as Error;
      
      // Проверяем, не был ли запрос отменен
      if (error.name === 'AbortError') {
        return;
      }

      setError(error);
      
      // Повторяем запрос если нужно
      if (retryCountRef.current < retryCount) {
        retryCountRef.current++;
        setTimeout(() => {
          fetchData(true);
        }, retryDelay * retryCountRef.current);
      }
    } finally {
      setLoading(false);
    }
  }, [apiCall, enabled, cacheKey, cacheTTL, retryCount, retryDelay]);

  const refetch = useCallback(async () => {
    await fetchData(true);
  }, [fetchData]);

  const mutate = useCallback((newData: T) => {
    setData(newData);
    if (cacheKey) {
      apiCache.set(cacheKey, newData, cacheTTL);
    }
  }, [cacheKey, cacheTTL]);

  // Первоначальная загрузка
  useEffect(() => {
    fetchData();
    
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData]);

  // Обновление при фокусе окна
  useEffect(() => {
    if (!refetchOnWindowFocus) return;

    const handleFocus = () => {
      if (!document.hidden) {
        refetch();
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleFocus);
    };
  }, [refetch, refetchOnWindowFocus]);

  return {
    data,
    loading,
    error,
    refetch,
    mutate
  };
};

export default useApi; 