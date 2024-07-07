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
      <ErrorBoundary>
        <header></header>
        <main>
          <h1>Poke berry</h1>
          <Search
            setSearchWord={(word: string) => {
              this.setState({ searchWord: word });
              localStorage.setItem('search', word);
            }}
          />
          <PokeData searchWord={this.state.searchWord} />
          <ErrorButton />
        </main>
        <footer></footer>
      </ErrorBoundary>
    );
  }
}

export default App;
