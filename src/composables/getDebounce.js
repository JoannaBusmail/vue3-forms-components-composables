

import { ref } from 'vue';

console.log('useDebounce composable initialized');

export const useDebounce = (callback, delay) => {
  const timeoutId = ref(null);

  const debounce = (...args) => {
    if (timeoutId.value) {
      clearTimeout(timeoutId.value);
    }

    if (typeof callback === 'function') {
      timeoutId.value = setTimeout(() => {
        callback(...args);
      }, delay);
    } else {
      console.error('Error: Callback is not a function.', callback);
    }
  };

  const resetDebounce = () => {
    if (timeoutId.value) {
      clearTimeout(timeoutId.value);
      timeoutId.value = null;
    }
  };

  return { debounce, resetDebounce };
};
