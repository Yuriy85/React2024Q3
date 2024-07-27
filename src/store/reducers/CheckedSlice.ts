import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ICard {
  number: number;
  name: string;
  id: string;
  url: string;
}
interface ICheckedCards {
  checkedCards: ICard[];
}

const initState: ICheckedCards = {
  checkedCards: [],
};

export const checkedSlice = createSlice({
  name: 'checkedCards',
  initialState: initState,
  reducers: {
    addCheckedCard(state, action: PayloadAction<ICard>) {
      const cards = state.checkedCards.concat(action.payload);
      cards.reduce((acc, card) => {
        card.number = acc + 1;
        return card.number;
      }, 0);
      state.checkedCards = cards;
    },
    removeCheckedCard(state, action: PayloadAction<ICard>) {
      const cards = state.checkedCards.filter((card) => card.id !== action.payload.id);
      cards.reduce((acc, card) => {
        card.number = acc + 1;
        return card.number;
      }, 0);

      state.checkedCards = cards;
    },
    clearCheckedCards(state) {
      state.checkedCards = [];
    },
  },
});

export default checkedSlice.reducer;
