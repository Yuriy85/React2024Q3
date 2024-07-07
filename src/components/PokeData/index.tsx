import { Component, ReactNode } from 'react';
import PokeCard from '../PokeCard';
import data from '../../data';
import { Pokes, getPokes } from '../../api/poke';

interface Props {
  children?: ReactNode;
  searchWord: string;
}

interface State {
  pokes: Pokes | null;
  error: Error | '';
  noResult: boolean;
}

class PokeData extends Component<Props, State> {
  public state: Readonly<State> = {
    pokes: null,
    error: '',
    noResult: false,
  };

  setUpperChar(string: string) {
    return `${string[0].toUpperCase()}${string.slice(1)}`;
  }

  filterPokes(pokeData: Pokes, searchWord: string) {
    const filteredPokeData: Pokes = Object.create(pokeData);
    const result = pokeData.results.filter((poke) =>
      poke.name.toLowerCase().includes(searchWord.toLowerCase().trimStart())
    );
    filteredPokeData.results = result;
    result.length ? this.setState({ noResult: false }) : this.setState({ noResult: true });
    return filteredPokeData;
  }

  async getPokes() {
    try {
      this.setState({ pokes: null });
      const pokeData: Pokes = (await getPokes(data.pokeApi)) as Pokes;
      setTimeout(() => {
        this.setState({ pokes: this.filterPokes(pokeData, this.props.searchWord) });
      }, 500);
    } catch (error) {
      this.setState({ error: error as Error });
    }
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>): void {
    if (!prevState.pokes || prevProps.searchWord === this.props.searchWord) {
      return;
    }
    this.getPokes();
  }

  componentDidMount(): void {
    this.getPokes();
  }

  render() {
    return (
      <div className="poke-data container">
        {this.state.error ? (
          <h2>Something went wrong: {this.state.error.message}</h2>
        ) : !this.state.pokes ? (
          <h2>Loading...</h2>
        ) : this.state.noResult ? (
          <h2>Sorry, not found.</h2>
        ) : (
          this.state.pokes.results.map((result) => (
            <PokeCard key={result.name} name={this.setUpperChar(result.name)} url={result.url} />
          ))
        )}
      </div>
    );
  }
}

export default PokeData;
