import axios from 'axios';

axios.defaults.baseURL = 'https://6267012078638336421a5fe0.mockapi.io';

export const fetchAllContacts = async () => {
  const response = await axios.get('/contacts');
  return response.data;
};

export const postContact = async newContact => {
  const response = await axios.post('/contacts', newContact);
  return response.data;
};
export const deleteContactById = async id => {
  await axios.delete(`/contacts/${id}`);
};
