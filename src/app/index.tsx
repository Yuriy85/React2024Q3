import { useState } from 'react';
import Search from '../components/Search/index';
import ErrorButton from '../components/ErrorButton';
import PokeData from '../components/PokeData';
import ErrorBoundary from '../components/ErrorBoundary';

function App() {
  const [searchWord, setSearchWord] = useState(localStorage.getItem('search') || '');

  return (
    <ErrorBoundary>
      <header></header>
      <main>
        <h1>Poke berry</h1>
        <Search searchWord={searchWord} setSearchWord={setSearchWord} />
        <PokeData searchWord={searchWord} />
        <ErrorButton />
      </main>
      <footer></footer>
    </ErrorBoundary>
  );
}

export default App;
