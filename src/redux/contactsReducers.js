import { combineReducers, createReducer } from '@reduxjs/toolkit';
import * as contactsActions from 'redux/contactsActions';

const items = createReducer([], {
  [contactsActions.fetchContactsSuccess]: (_, action) => action.payload,
  [contactsActions.addContactSucceess]: (state, action) => [
    ...state,
    action.payload,
  ],
  [contactsActions.removeContactSuccess]: (state, action) =>
    state.filter(item => item.id !== action.payload),
});

const isLoading = createReducer(false, {
  [contactsActions.fetchContactsRequest]: () => true,
  [contactsActions.fetchContactsSuccess]: () => false,
  [contactsActions.fetchContactsError]: () => false,
  [contactsActions.addContactRequest]: () => true,
  [contactsActions.addContactSucceess]: () => false,
  [contactsActions.addContactError]: () => false,
  [contactsActions.removeContactRequest]: () => true,
  [contactsActions.removeContactSuccess]: () => false,
  [contactsActions.removeContactError]: () => false,
});

const error = createReducer(null, {
  [contactsActions.fetchContactsRequest]: () => null,
  [contactsActions.fetchContactsError]: (_, action) => action.payload,
  [contactsActions.addContactRequest]: () => null,
  [contactsActions.addContactError]: (_, action) => action.payload,
  [contactsActions.removeContactRequest]: () => null,
  [contactsActions.removeContactError]: (_, action) => action.payload,
});

const filter = createReducer('', {
  [contactsActions.changeFilterValue]: (_, action) => action.payload,
  [contactsActions.resetFilterValue]: () => '',
});

export const contactsReducer = combineReducers({
  items,
  isLoading,
  error,
  filter,
});
