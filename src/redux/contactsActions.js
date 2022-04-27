import { createAction } from '@reduxjs/toolkit';

//for fetchContacts
export const fetchContactsRequest = createAction(
  'contacts/fetchContactsRequest'
);
export const fetchContactsSuccess = createAction(
  'contacts/fetchContactsSuccess'
);
export const fetchContactsError = createAction('contacts/fetchContactsError');

// for addContact
export const addContactRequest = createAction('contacts/addContactRequest');
export const addContactSucceess = createAction('contact/addContactSucceess');
export const addContactError = createAction('contact/addContactError');

//for removeContact
export const removeContactRequest = createAction(
  'contacts/removeContactRequest'
);
export const removeContactSuccess = createAction(
  'contacts/removeContactSuccess'
);
export const removeContactError = createAction('contacts/removeContactError');

// // for filter

// export const changeFilterRequest = createAction('contacts/changeFilterRequest');
// export const changeFilterSuccess = createAction('contacts/changeFilterSuccess');
// export const changeFilterError = createAction('contacts/changeFilterError');
