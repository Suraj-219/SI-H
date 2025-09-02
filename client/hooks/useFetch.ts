import { useEffect, useState } from "react";

export function useFetch<T>(fn: () => Promise<T>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    fn()
      .then((d) => mounted && setData(d))
      .catch((e) => mounted && setError(e as Error))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error, reload: () => fn().then(setData) };
}
