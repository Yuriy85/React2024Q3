import { useState } from 'react';
import Search from '../components/Search/index';
import ErrorButton from '../components/ErrorButton';
import PokeData from '../components/PokeData';
import Pagination from '../components/Pagination';
import ThemeButton from '../components/ThemeButton';
import { ThemeContext } from '../context';
import { Provider } from 'react-redux';
import { configStore } from '../store';
import CheckedDetail from '../components/CheckedDetail';

function App() {
  const [searchWord, setSearchWord] = useState(localStorage.getItem('search') || '');
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      <Provider store={configStore}>
        <div className={!darkTheme ? 'main-theme' : 'dark-theme'}>
          <header></header>
          <main>
            <h1>Poke berry</h1>
            <ErrorButton />
            <ThemeButton />
            <Search searchWord={searchWord} setSearchWord={setSearchWord} />
            <PokeData searchWord={searchWord} setPageCount={setPageCount} />
            <CheckedDetail />
            <Pagination pageCount={pageCount} />
          </main>
          <footer></footer>
        </div>
      </Provider>
    </ThemeContext.Provider>
  );
}

export default App;
