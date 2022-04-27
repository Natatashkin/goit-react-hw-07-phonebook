import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '../IconButton';
import { FaTrashAlt } from 'react-icons/fa';
import { List, Item, Name, Number } from './ContactList.styles';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import * as contactsOperations from 'redux/contactsOperations';
import * as selectors from 'redux/contactsSelectors';

const ContactList = ({ onClick }) => {
  const dispatch = useDispatch();
  const items = useSelector(selectors.getItems);
  const filterValue = useSelector(selectors.getFilterValue);

  const showFilteredContacts = () => {
    const normalizedFilter = filterValue.toLocaleLowerCase();
    return items.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = showFilteredContacts();

  return (
    <List>
      {items.length > 0 &&
        filteredContacts.map(item => {
          const { id, name, phone } = item;
          return (
            <Item key={id}>
              <Name>{name}</Name>
              <Number>{phone}</Number>
              <IconButton
                type="button"
                background="blue"
                aria-label="Button to delete contact"
                onClick={() =>
                  dispatch(contactsOperations.deleteContact({ id, name }))
                }
              >
                <FaTrashAlt />
              </IconButton>
            </Item>
          );
        })}
    </List>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default ContactList;
