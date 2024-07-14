import { useState } from 'react';
import Search from '../components/Search/index';
import ErrorButton from '../components/ErrorButton';
import PokeData from '../components/PokeData';
import Pagination from '../components/Pagination';

function App() {
  const [searchWord, setSearchWord] = useState(localStorage.getItem('search') || '');
  const [pageCount, setPageCount] = useState<number | null>(null);

  return (
    <>
      <header></header>
      <main>
        <h1>Poke berry</h1>
        <ErrorButton />
        <Search searchWord={searchWord} setSearchWord={setSearchWord} />
        <PokeData searchWord={searchWord} setPageCount={setPageCount} />
        <Pagination pageCount={pageCount} />
      </main>
      <footer></footer>
    </>
  );
}

export default App;
