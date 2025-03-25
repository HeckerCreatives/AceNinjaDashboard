import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value); // ✅ Only update after delay
    }, delay);

    return () => clearTimeout(handler); // ✅ Clears timeout on value change
  }, [value, delay]);

  return debouncedValue;
}
