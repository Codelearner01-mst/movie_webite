export function saveToLocalStorage(key, value) {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
}

export function getFromLocalStorage(key) {
  try {
    const serializedValue = localStorage.getItem(key);
    return JSON.parse(serializedValue) || [];
  } catch (error) {
    console.error("Error getting from localStorage:", error);
    return [];
  }
}
