import { useNavigate, useParams } from 'react-router-dom';
import { trimPath } from '../../utils/trimPath';
import { fetchPoke } from '../../api/poke';
import Loader from '../Loader';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

function PokeDetail() {
  const { detail } = useParams();
  const { data: poke, error, isFetching } = fetchPoke.useGetPokeInfoQuery(detail || '');
  const navigate = useNavigate();

  return (
    <div className="poke-data__card poke-data__detail">
      {error && <h2>{(error as FetchBaseQueryError).status}</h2>}
      {isFetching && <Loader />}
      {poke && (
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
