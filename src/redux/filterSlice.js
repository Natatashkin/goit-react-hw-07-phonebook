import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    changeFilterValue(_, { payload }) {
      return payload;
    },

    resetFilterValue() {
      return '';
    },
  },
});

export const { changeFilterValue, resetFilterValue } = filterSlice.actions;
