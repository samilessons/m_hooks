import { useState, useCallback } from "react";

export default function useHtpp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (url) => {
    setLoading(true);

    try {
      const response = await fetch(url);

      if (!response.ok || !response) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      const data = await response.json();

      // custom error in front end side
      if (data.error) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      setLoading(false);
      return data;
    }
    
    catch (e) {
      setLoading(false);
      setError(e.message);
      throw e;
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { loading, error, request, clearError };
}