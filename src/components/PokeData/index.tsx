import { ReactNode, useEffect, useState } from 'react';
import PokeCard from '../PokeCard';
import data from '../../data';
import { Pokes, getPokes } from '../../api/poke';
import Loader from '../Loader';

interface Props {
  children?: ReactNode;
  searchWord: string;
}

function PokeData(props: Props) {
  const [pokes, setPokes] = useState<Pokes | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [noResult, setNoResults] = useState(false);

  const setUpperChar = (string: string) => {
    return `${string[0].toUpperCase()}${string.slice(1)}`;
  };

  const filterPokes = (pokeData: Pokes, searchWord: string) => {
    const filteredPokeData: Pokes = Object.create(pokeData);
    const result = pokeData.results.filter((poke) =>
      poke.name.toLowerCase().includes(searchWord.toLowerCase().trimStart())
    );
    filteredPokeData.results = result;
    setNoResults(!result.length);
    return filteredPokeData;
  };

  const getPokesData = async () => {
    try {
      setPokes(null);
      const pokeData: Pokes = (await getPokes(data.pokeApi)) as Pokes;
      setPokes(filterPokes(pokeData, props.searchWord));
    } catch (error) {
      setError(error as Error);
    }
  };

  useEffect(() => {
    getPokesData();
  }, [props.searchWord]);

  return (
    <div className="poke-data container">
      {error ? (
        <h2>Something went wrong: {error.message}</h2>
      ) : !pokes ? (
        <Loader />
      ) : noResult ? (
        <h2>Sorry, not found.</h2>
      ) : (
        pokes.results.map((result) => (
          <PokeCard key={result.name} name={setUpperChar(result.name)} url={result.url} />
        ))
      )}
    </div>
  );
}

export default PokeData;
