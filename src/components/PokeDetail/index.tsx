import { useNavigate, useParams } from 'react-router-dom';
import { trimPath } from '../../utils/trimArray';
import { useEffect, useState } from 'react';
import { Poke, getPoke } from '../../api/poke';
import Loader from '../Loader';
import data from '../../data';

function PokeDetail() {
  const [poke, setPoke] = useState<Poke | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const { detail } = useParams();
  const navigate = useNavigate();

  const getPokeData = async (url: string) => {
    try {
      setPoke(null);
      const pokeData = await getPoke(url);
      setPoke(pokeData);
    } catch (error) {
      setError(error as Error);
    }
  };

  useEffect(() => {
    if (!error) return;
    navigate('/404');
  }, [error]);

  useEffect(() => {
    if (!detail) {
      return;
    }
    getPokeData(`${data.pokeApi}/${detail}`);
  }, [detail]);

  return (
    <div className="poke-data__card poke-data__detail">
      {!poke ? (
        <Loader />
      ) : (
        <>
          <div
            style={{ cursor: 'pointer', fontSize: '2rem', width: 'fit-content' }}
            onClick={() => navigate(trimPath(location.pathname, 'detail'))}
          >
            &#10008;
          </div>
          <h2>{poke.name}</h2>
          <p>{`Firmness: ${poke.firmness.name}`}</p>
          <p>{`Growth time: ${poke.growth_time}`}</p>
          <p>{`Max harvest: ${poke.max_harvest}`}</p>
          <p>{`Gift type: ${poke.natural_gift_type.name}`}</p>
          <p>{`Size: ${poke.size}`}</p>
          <p>{`Smoothness: ${poke.smoothness}`}</p>
        </>
      )}
    </div>
  );
}

export default PokeDetail;
