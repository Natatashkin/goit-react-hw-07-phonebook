import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from 'redux/contactsReducers';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
});
