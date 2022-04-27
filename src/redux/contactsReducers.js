import { combineReducers, createReducer } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContact,
  deleteContact,
} from 'redux/contactsOperations';
import { filterSlice } from 'redux/filterSlice';

const items = createReducer([], {
  [fetchContacts.fulfilled]: (_, action) => action.payload,
  [addContact.fulfilled]: (state, action) => [...state, action.payload],
  [deleteContact.fulfilled]: (state, action) =>
    state.filter(item => item.id !== action.payload),
});

const isLoading = createReducer(false, {
  [fetchContacts.pending]: () => true,
  [fetchContacts.fulfilled]: () => false,
  [fetchContacts.rejected]: () => false,
  [addContact.pending]: () => true,
  [addContact.fulfilled]: () => false,
  [addContact.rejected]: () => false,
  [deleteContact.pending]: () => true,
  [deleteContact.fulfilled]: () => false,
  [deleteContact.rejected]: () => false,
});

const error = createReducer(null, {
  [fetchContacts.pending]: () => null,
  [fetchContacts.rejected]: (_, action) => action.payload,
  [addContact.pending]: () => null,
  [addContact.rejected]: (_, action) => action.payload,
  [deleteContact.pending]: () => null,
  [deleteContact.rejected]: (_, action) => action.payload,
});

export const contactsReducer = combineReducers({
  items,
  isLoading,
  error,
  filter: filterSlice.reducer,
});
