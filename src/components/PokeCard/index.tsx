import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { trimPath } from '../../utils/trimArray';

interface Props {
  name: string;
  url: string;
}

function PokeCard(props: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { detail } = useParams();

  const getPokeId = () =>
    props.url
      .split('/')
      .filter((str) => str)
      .slice(-1)[0];

  return (
    <div
      onClick={(event) => {
        event.stopPropagation();
        if (detail) {
          navigate(`${trimPath(location.pathname, 'detail')}detail/${getPokeId()}`);
        } else {
          navigate(`${location.pathname}detail/${getPokeId()}`);
        }
      }}
      className="poke-data__card"
    >
      <h2>{props.name}</h2>
    </div>
  );
}

export default PokeCard;
