export function applyTheme(isDarkMode: boolean) {
  if (isDarkMode) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
}
