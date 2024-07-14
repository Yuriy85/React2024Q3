import { useEffect, useState } from 'react';
import PokeCard from '../PokeCard';
import data from '../../data';
import { Pokes, getPokes } from '../../api/poke';
import Loader from '../Loader';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { trimPath } from '../../utils/trimArray';

interface Props {
  searchWord: string;
  setPageCount: React.Dispatch<React.SetStateAction<number | null>>;
}

function PokeData(props: Props) {
  const [pokes, setPokes] = useState<Pokes | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [noResult, setNoResults] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { page } = useParams();
  const { detail } = useParams();

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

  const getPokesData = async (page?: number) => {
    try {
      setPokes(null);
      const pokeData = await getPokes(data.pokeApi, page);
      props.setPageCount(+pokeData.pages);
      setPokes(filterPokes(pokeData.pokes, props.searchWord));
    } catch (error) {
      setError(error as Error);
    }
  };

  useEffect(() => {
    if (!error) return;
    navigate('/404');
  }, [error]);

  useEffect(() => {
    if (page) {
      getPokesData(+page);
      return;
    }
    getPokesData();
  }, [props.searchWord, page]);

  return (
    <div className="poke-data container">
      <div
        className="container"
        onClick={() => detail && navigate(trimPath(location.pathname, 'detail'))}
      >
        {!pokes ? (
          <Loader />
        ) : noResult ? (
          <h2>Sorry, not found.</h2>
        ) : (
          pokes.results.map((result) => (
            <PokeCard key={result.name} name={setUpperChar(result.name)} url={result.url} />
          ))
        )}
      </div>
      <Outlet />
    </div>
  );
}

export default PokeData;
