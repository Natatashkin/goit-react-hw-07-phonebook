import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '../IconButton';
import { FaTrashAlt } from 'react-icons/fa';
import { List, Item, Name, Number } from './ContactList.styles';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import * as contactsOperations from 'redux/contactsOperations';

const ContactList = ({ onClick }) => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.contacts.items);

  return (
    <List>
      {items &&
        items.map(item => {
          const { id, name, phone } = item;
          return (
            <Item key={id}>
              <Name>{name}</Name>
              <Number>{phone}</Number>
              <IconButton
                type="button"
                background="blue"
                aria-label="Button to delete contact"
                onClick={() => dispatch(contactsOperations.deleteContact(id))}
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
