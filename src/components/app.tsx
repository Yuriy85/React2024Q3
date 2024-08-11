import { useState } from 'react';
import Search from './Search/index';
import ErrorButton from './ErrorButton';
import PokeData from './PokeData';
import Pagination from './Pagination';
import ThemeButton from './ThemeButton';
import { ThemeContext } from '../context';
import { Provider } from 'react-redux';
import { configStore } from '../store';
import CheckedDetail from './CheckedDetail';
import ErrorBoundary from './ErrorBoundary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PokeDetail from './PokeDetail';
import NotFound from '../pages/404';

function Main() {
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

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="detail/:detail" element={<PokeDetail />} />
          </Route>
          <Route path="page/:page" element={<Main />}>
            <Route path="detail/:detail" element={<PokeDetail />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
