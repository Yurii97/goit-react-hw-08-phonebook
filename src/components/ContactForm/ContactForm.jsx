import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import toast from 'react-hot-toast';
import {useGetContactsQuery, useAddContactMutation, useChangeContactMutation } from 'services/contactsApi';
import Spiner from 'components/Spiner/Spiner';
import { useSelector } from 'react-redux';
import s from './ContactForm.module.css'

export default function ContactForm({ onClose, nameCont, numberCont, id }) {
  const [name, setName] = useState(nameCont);
  const [number, setNumber] = useState(numberCont);
  const [addContact, { isLoading }] = useAddContactMutation();
  const { token } = useSelector(state => state);
  const { data } = useGetContactsQuery(token);
  const [changeContact] = useChangeContactMutation();

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const submitForm = e => {
    e.preventDefault();
    if (name.trim() === '' || number.trim() === '') {
      toast.error('values ​​are invalid')
      return
    }
    const newContact = {      
      "name":name,
      "number":number,
    };
    if (id) {
      changeContact({ id, token, newContact })
      setNumber('');
      setName('');
      onClose();
      return;
    }
    addNewContact(newContact);
    setNumber('');
    setName('');
    onClose();
  };

  const addNewContact = newContact => {
    if (
      data.some(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      toast.error('contact with such name already exists');
      return;
    }
    addContact({token, newContact});
    toast.success('contact added');
  };

  return (
    <>    
      <Form className={s.form} onSubmit={submitForm}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" value={name} placeholder="Enter name" onChange={handleChange} />
          <Form.Text className="text-muted">
Enter name          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicNumber">
          <Form.Label>Number</Form.Label>
          <Form.Control type="tel" name="number" value={number} placeholder="number" onChange={handleChange} />
          <Form.Text className="text-muted">
Enter phone number          </Form.Text>
        </Form.Group>
        <div className={s.btnList}>
          <Button variant="primary" type="submit" >
            {id ? 'Rename Contact' : 'Add contact'}
          </Button>
        </div>
        <div className={s.link}>
          {isLoading && <Spiner size={25} />}
        </div>        
      </Form>
    </>
  );
}
