import { useState, useEffect } from "react";

const useLocalStorage = (key: string, initialValue: number) => {
  const [value, setValue] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } else {
        return initialValue;
      }
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(error);
    }
  }, [key, value]);

  return [value, setValue];
};

const useLocalFileStorage = async (
  key: string,
  initialValue: string,
  fileName: string
) => {
  const storedValue = localStorage.getItem(key);

  if (fileName.length > 1) {
    const storedFile = JSON.parse(storedValue || "");
    return storedFile[fileName].value;
  }

  if (storedValue !== null) {
    return [
      storedValue,
      (value: string) => localStorage.setItem(key, value),
    ] as const;
  } else {
    localStorage.setItem(key, initialValue);
    return [
      initialValue,
      (value: string) => localStorage.setItem(key, value),
    ] as const;
  }
};

export { useLocalStorage, useLocalFileStorage };
