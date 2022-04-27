import React from 'react';
import * as yup from 'yup';
import { Formik, Form, ErrorMessage } from 'formik';
import toast from 'react-hot-toast';
import { FormField, Input, Label, ErrorMessageStyle } from './Form.styled';
import Button from '../Button';
import * as contactsOperations from 'redux/contactsOperations';
import * as selectors from 'redux/contactsSelectors';
import { useDispatch, useSelector } from 'react-redux';

const nameRegEx = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const phoneRegEx =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(nameRegEx, 'The name must contain only characters')
    .required(),
  phone: yup
    .string()
    .matches(phoneRegEx, 'Phone number is not valid')
    .min(7, "It's not looks like phone!")
    .max(13, 'Must be minimum 7 maximum 13 digits ')
    .required(),
});

export const AppForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectors.getItems);

  const handleSubmit = (values, { resetForm }) => {
    const { name } = values;
    const newName = checkUniqueName(name);

    if (newName) {
      toast.error(`Name ${name} is already in contacts`);
      return;
    }

    dispatch(contactsOperations.addContact(values));
    toast.success(`${values.name} was added to contacts!`);
    resetForm();
  };

  const checkUniqueName = newName => {
    const normalyzeName = newName.toLocaleLowerCase();
    return contacts.find(
      ({ name }) => name.toLocaleLowerCase() === normalyzeName
    );
  };

  return (
    <div>
      <Formik
        initialValues={{ name: '', phone: '' }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form>
          <FormField>
            <Label htmlFor="name">Contact Name</Label>
            <Input name="name" type="text" placeholder=" " />
            <ErrorMessage
              name="name"
              render={msg => <ErrorMessageStyle>{msg}</ErrorMessageStyle>}
            />
          </FormField>

          <FormField>
            <Label htmlFor="phone">Contact Number</Label>
            <Input name="phone" type="tel" placeholder=" " />
            <ErrorMessage
              name="phone"
              render={msg => <ErrorMessageStyle>{msg}</ErrorMessageStyle>}
            />
          </FormField>

          <Button type={'submit'} title={'Add Contact'} />
        </Form>
      </Formik>
    </div>
  );
};

export default AppForm;
