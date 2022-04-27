import React from 'react';
import * as yup from 'yup';
import { Formik, Form, ErrorMessage } from 'formik';
import { FormField, Input, Label, ErrorMessageStyle } from './Form.styled';
import Button from '../Button';
import * as contactsOperations from 'redux/contactsOperations';
import { useDispatch } from 'react-redux';

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

  const handleSubmit = (values, { resetForm }) => {
    dispatch(contactsOperations.addContact(values));
    resetForm();
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

// const checkUniqueName = newName => {
//   const normalyzeName = newName.toLocaleLowerCase();
//   return contacts.find(
//     ({ name }) => name.toLocaleLowerCase() === normalyzeName
//   );
// };

// const numberFormatting = number => {
//   const array = [...number];
//   for (let i = 3; i < array.length - 1; i += 2) {
//     array.splice(i, 0, '-');
//   }
//   console.log();
//   return array.join('');
// };

// const addContact = formValues => {
//   const { name, number } = formValues;
//   const newName = checkUniqueName(name);
//   const formatedNumber = numberFormatting(number);

//   if (newName) {
//     toast.error(`Name ${name} is already in contacts`);
//     return;
//   }

//   const contact = {
//     id: nanoid(),
//     name,
//     number: formatedNumber,
//   };

//   setContacts(prevContacts => [contact, ...prevContacts]);
//   toast.success(`${name} was added to contacts!`);
// };
