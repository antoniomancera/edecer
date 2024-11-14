export function applyTheme(isDarkMode: boolean) {
  if (isDarkMode) {
    document.body.classList.add('dark');
    document.documentElement.classList.add('ion-palette-dark');
  } else {
    document.body.classList.remove('dark');
    document.documentElement.classList.remove('ion-palette-dark');
  }
}
