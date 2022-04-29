import PropTypes from 'prop-types';
import { AppSyles, AppTitle } from './App.styled';
import { Toaster } from 'react-hot-toast';
import AppForm from './Form';
import Section from './Section';
import Filter from './Filter';
import ContactList from './ContactList';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import * as contactsOperations from 'redux/contactsOperations';
import * as selectors from 'redux/contactsSelectors';

const App = ({ title }) => {
  const dispatch = useDispatch();
  const items = useSelector(selectors.getItems);
  const isLoading = useSelector(selectors.getLoadingStatus);

  useEffect(() => {
    dispatch(contactsOperations.fetchContacts());
  }, [dispatch]);

  return (
    <AppSyles>
      <AppTitle>{title}</AppTitle>
      <Section>
        <AppForm />
      </Section>

      <Section title="Contacts">
        {!isLoading && items.length === 0 && (
          <p>You haven't any contacts yet!</p>
        )}
       
        {items.length > 0 && (
          <>
            <Filter />
            <ContactList />
          </>
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
