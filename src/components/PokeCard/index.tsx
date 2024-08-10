import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { trimPath } from '../../utils/trimPath';
import { useSelector } from 'react-redux';
import { checkedSlice } from '../../store/reducers/CheckedSlice';
import { useDispatch } from 'react-redux';
import { MyReducerState } from '../../store';

interface Props {
  name: string;
  url: string;
}

function PokeCard(props: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { detail } = useParams();
  const { addCheckedCard, removeCheckedCard } = checkedSlice.actions;
  const { checkedCards } = useSelector((state: MyReducerState) => state.checkedSliceReducer);
  const dispatch = useDispatch();

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
      <input
        type="checkbox"
        checked={checkedCards.some((card) => card.id === getPokeId())}
        onClick={(event) => event.stopPropagation()}
        onChange={(event) => {
          const checkbox: HTMLInputElement = event.target as HTMLInputElement;
          const checkedData = { number: 0, name: props.name, id: getPokeId(), url: props.url };
          checkbox.checked
            ? dispatch(addCheckedCard(checkedData))
            : dispatch(removeCheckedCard(checkedData));
        }}
      ></input>
    </div>
  );
}

export default PokeCard;
