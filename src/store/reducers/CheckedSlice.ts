import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ICard {
  id: string;
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
    addCheckedCard(state, action: PayloadAction<string>) {
      state.checkedCards.push({ id: action.payload });
    },
    removeCheckedCard(state, action: PayloadAction<string>) {
      state.checkedCards = state.checkedCards.filter((card) => card.id !== action.payload);
    },
    clearCheckedCards(state) {
      state.checkedCards = [];
    },
  },
});

export default checkedSlice.reducer;
