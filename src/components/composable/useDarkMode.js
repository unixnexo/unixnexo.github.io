import { ref, watchEffect } from 'vue';

export function useDarkMode() {
  const theme = ref(localStorage.getItem('theme') || 'light');

  watchEffect(() => {
    localStorage.setItem('theme', theme.value);
    document.documentElement.classList.toggle('dark', theme.value === 'dark');
  });

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
  };

  return { theme, toggleTheme };
}
