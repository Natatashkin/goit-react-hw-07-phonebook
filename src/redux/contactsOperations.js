import * as contactsAPI from 'services/contactsAPI';
import * as contactsActions from 'redux/contactsActions';
import toast from 'react-hot-toast';

export const fetchContacts = () => async dispatch => {
  dispatch(contactsActions.fetchContactsRequest());

  try {
    const contacts = await contactsAPI.fetchAllContacts();
    dispatch(contactsActions.fetchContactsSuccess(contacts));
  } catch (error) {
    dispatch(contactsActions.fetchContactsError(error));
  }
};

export const addContact = contact => async dispatch => {
  dispatch(contactsActions.addContactRequest());

  try {
    const response = await contactsAPI.postContact(contact);
    dispatch(contactsActions.addContactSucceess(response));
  } catch (error) {
    dispatch(contactsActions.addContactError(error));
  }
};

export const deleteContact = id => async dispatch => {
  dispatch(contactsActions.removeContactRequest());
  try {
    await contactsAPI.deleteContactById(id);
    dispatch(contactsActions.removeContactSuccess(id));
    toast.success(`Contact was deleted!`);
  } catch (error) {
    dispatch(contactsActions.removeContactError(error));
  }
};
