import { useState } from 'react';
import PropTypes from 'prop-types';
import { AppSyles, AppTitle } from './App.styled';
import toast, { Toaster } from 'react-hot-toast';
import AppForm from './Form';
import Section from './Section';
import Filter from './Filter';
import ContactList from './ContactList';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import * as contactsOperations from 'redux/contactsOperations';

const App = ({ title }) => {
  const [filter, setFilter] = useState('');

  const dispatch = useDispatch();
  const items = useSelector(state => state.contacts.items);

  useEffect(() => {
    dispatch(contactsOperations.fetchContacts());
  }, [dispatch]);

  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  // function showfilteredContacts() {
  //   const normalizedFilter = filter.toLocaleLowerCase();
  //   return contacts.filter(contact =>
  //     contact.name.toLowerCase().includes(normalizedFilter)
  //   );
  // }

  const resetFilter = () => {
    setFilter('');
  };

  return (
    <AppSyles>
      <AppTitle>{title}</AppTitle>
      <Section>
        <AppForm />
      </Section>

      <Section title="Contacts">
        {items && items.length > 0 ? (
          <>
            <Filter
              value={filter}
              onChange={handleFilterChange}
              onClick={resetFilter}
            />
            <ContactList />
          </>
        ) : (
          <p>You haven't any contacts yet!</p>
        )}
      </Section>
      <Toaster />
    </AppSyles>
  );
};

App.propTypes = {
  title: PropTypes.string,
};

export default App;
