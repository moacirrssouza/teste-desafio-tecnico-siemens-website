import { useEffect, useState } from 'react';
import apiClient from '../services/api';

export function useFetch<T = unknown>(url: string, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    apiClient.get(url)
      .then((res) => {
        if (!mounted) return;
        setData(res as T);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err?.message || 'Error');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}
