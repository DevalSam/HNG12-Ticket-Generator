/**
 * Checks if localStorage is available
 * @returns {boolean}
 */
const isStorageAvailable = () => {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Stores data in localStorage
 * @param {string} key - The storage key
 * @param {any} value - The value to store
 * @returns {boolean} - Success status
 */
export const storeData = (key, value) => {
  if (!isStorageAvailable()) {
    console.error('localStorage is not available');
    return false;
  }

  if (!key || typeof key !== 'string') {
    console.error('Storage key must be a non-empty string');
    return false;
  }

  try {
    // Validate that value can be serialized
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    console.error(`Error storing data for key "${key}":`, error);
    return false;
  }
};

/**
 * Retrieves data from localStorage
 * @param {string} key - The storage key
 * @param {any} defaultValue - Value to return if key doesn't exist
 * @returns {any} - The stored value or defaultValue
 */
export const getStoredData = (key, defaultValue = null) => {
  if (!isStorageAvailable()) {
    console.error('localStorage is not available');
    return defaultValue;
  }

  if (!key || typeof key !== 'string') {
    console.error('Storage key must be a non-empty string');
    return defaultValue;
  }

  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;

    try {
      return JSON.parse(item);
    } catch (parseError) {
      console.error(`Error parsing stored value for key "${key}":`, parseError);
      localStorage.removeItem(key); // Clean up invalid data
      return defaultValue;
    }
  } catch (error) {
    console.error(`Error retrieving data for key "${key}":`, error);
    return defaultValue;
  }
};

/**
 * Removes data from localStorage
 * @param {string} key - The storage key
 * @returns {boolean} - Success status
 */
export const clearStoredData = (key) => {
  if (!isStorageAvailable()) {
    console.error('localStorage is not available');
    return false;
  }

  if (!key || typeof key !== 'string') {
    console.error('Storage key must be a non-empty string');
    return false;
  }

  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error clearing data for key "${key}":`, error);
    return false;
  }
};

/**
 * Checks if a key exists in localStorage
 * @param {string} key - The storage key
 * @returns {boolean}
 */
export const hasStoredData = (key) => {
  if (!isStorageAvailable() || !key || typeof key !== 'string') {
    return false;
  }

  try {
    return localStorage.getItem(key) !== null;
  } catch {
    return false;
  }
};