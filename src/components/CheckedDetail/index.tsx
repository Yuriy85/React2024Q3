import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MyReducerState } from '../../store';
import { checkedSlice } from '../../store/reducers/CheckedSlice';
import { downloadCSV } from '../../utils/downloadCSV';

function CheckedDetail() {
  const dispatch = useDispatch();
  const { checkedCards } = useSelector((state: MyReducerState) => state.checkedSliceReducer);
  const { clearCheckedCards } = checkedSlice.actions;

  return (
    <>
      {checkedCards.length ? (
        <div
          className="poke-data__card container"
          style={{ width: 'fit-content', cursor: 'default' }}
        >
          <p>Selected cards - {checkedCards.length}</p>
          <button className="theme-button" onClick={() => dispatch(clearCheckedCards())}>
            Unselect all
          </button>
          <button
            className="theme-button"
            onClick={() => {
              downloadCSV(checkedCards, `${checkedCards.length}_poke`);
            }}
          >
            Download
          </button>
        </div>
      ) : null}
    </>
  );
}

export default CheckedDetail;
