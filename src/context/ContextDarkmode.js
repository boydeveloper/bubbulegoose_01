import { createContext, useContext } from 'react';
import useLocalStorage from 'use-local-storage';

const Context = createContext();

export const DarkmodeContext = ({ children }) => {
  const defaultDark = window.matchMedia('(prefers-color-scheme: Dark)').matches;
  const [theme, setTheme] = useLocalStorage(
    'theme',
    defaultDark ? 'Dark' : 'light'
  );
  console.log(theme);
  const swithTheme = () => {
    const newTheme = theme === 'light' ? 'Dark' : 'light';
    setTheme(newTheme);
    console.log('lolllllllllll');
  };
  return (
    <Context.Provider
      value={{
        swithTheme,
        theme,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useDarkMode = () => useContext(Context);
