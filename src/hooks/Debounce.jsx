import { useState, useEffect } from "react";

const useDebounce = (query, delay) => {
  const [debouncedValue, setDebounceValue] = useState(query);
  console.log("debounce function rerenders runs");
  useEffect(() => {
    const searchTimeOut = setTimeout(() => {
      setDebounceValue(query);
    }, delay);
    return () => {
      clearTimeout(searchTimeOut);
    };
  }, [query, delay]);
  return debouncedValue;
};

export default useDebounce;
