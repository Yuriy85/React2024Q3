import { Component } from 'react';
import Search from '../components/Search/index';
import ErrorButton from '../components/ErrorButton';
import PokeData from '../components/PokeData';
import ErrorBoundary from '../components/ErrorBoundary';

interface State {
  searchWord: string;
}

class App extends Component {
  public state: Readonly<State> = {
    searchWord: localStorage.getItem('search') || '',
  };

  render() {
    return (
      <>
        <header></header>
        <main>
          <h1>Poke berry</h1>
          <ErrorBoundary>
            <ErrorButton />
            <Search
              setSearchWord={(word: string) => {
                this.setState({ searchWord: word });
                localStorage.setItem('search', word);
              }}
            />
            <PokeData searchWord={this.state.searchWord} />
          </ErrorBoundary>
        </main>
        <footer></footer>
      </>
    );
  }
}

export default App;
