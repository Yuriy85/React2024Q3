import { Component } from 'react';
import { Poke, getPokes } from '../../api/poke';
import Loader from '../Loader';

interface Props {
  name: string;
  url: string;
}

interface State {
  error: Error | null;
  pokeData: Poke | null;
}

class PokeCard extends Component<Props, State> {
  public state: Readonly<State> = {
    error: null,
    pokeData: null,
  };

  async componentDidMount(): Promise<void> {
    try {
      const pokeData: Poke = (await getPokes(this.props.url)) as Poke;
      this.setState({ pokeData });
    } catch (error) {
      this.setState({ error: error as Error });
    }
  }

  render() {
    return (
      <div className="poke-data__card">
        {this.state.error ? (
          <h2>
            {this.props.name} <br /> <span>Something went wrong: {this.state.error.message}</span>
          </h2>
        ) : !this.state.pokeData ? (
          <Loader />
        ) : (
          <>
            <h2>{this.props.name}</h2>
            <p>Size: {(this.state.pokeData as Poke).size}</p>
            <p>Firmness: {(this.state.pokeData as Poke).firmness.name}</p>
            <p>Gift type: {(this.state.pokeData as Poke).natural_gift_type.name}</p>
            <p>Gift power: {(this.state.pokeData as Poke).gift_power}</p>
            <p>Growth time: {(this.state.pokeData as Poke).growth_time}</p>
            <p>Smoothness: {(this.state.pokeData as Poke).smoothness}</p>
            <p>Growth time: {(this.state.pokeData as Poke).growth_time}</p>
            <p>Max harvest: {(this.state.pokeData as Poke).max_harvest}</p>
          </>
        )}
      </div>
    );
  }
}

export default PokeCard;
