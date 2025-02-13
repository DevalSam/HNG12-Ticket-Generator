import { useState, useEffect, useCallback } from 'react';

const useLocalStorage = (key, initialValue) => {
  // Validate key
  if (!key || typeof key !== 'string') {
    console.error('Storage key must be a non-empty string');
    return [initialValue, () => {}];
  }

  // Initialize state with a function to avoid unnecessary computation
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Validate stored data
      if (item) {
        try {
          const parsed = JSON.parse(item);
          return parsed;
        } catch (parseError) {
          console.error(`Error parsing stored value for key "${key}":`, parseError);
          window.localStorage.removeItem(key); // Clean up invalid data
          return initialValue;
        }
      }
      return initialValue;
    } catch (error) {
      console.error(`Error accessing localStorage for key "${key}":`, error);
      return initialValue;
    }
  });

  // Memoized setValue function
  const setValue = useCallback((value) => {
    try {
      // Allow value to be a function for consistency with useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Validate that value can be serialized
      JSON.stringify(valueToStore);
      
      // Update state
      setStoredValue(valueToStore);
      
      // Update localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error saving to localStorage for key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Sync with localStorage changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key) {
        try {
          const newValue = event.newValue ? JSON.parse(event.newValue) : initialValue;
          setStoredValue(newValue);
        } catch (error) {
          console.error(`Error handling storage change for key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, initialValue]);

  return [storedValue, setValue];
};

export default useLocalStorage;