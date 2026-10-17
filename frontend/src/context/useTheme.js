import { useContext } from 'react';
import { ThemeContext } from './ThemeContextInstance';

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used inside ThemeProvider');
  return context;
}

export default useTheme;
