import { useDeleteContactMutation} from 'services/contactsApi'
import toast from 'react-hot-toast';
import Spiner from "components/Spiner/Spiner"
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { BsFillTrashFill, BsPenFill } from "react-icons/bs";
import Modal from 'components/Modal/Modal';
import ContactForm from 'components/ContactForm/ContactForm';
import { useState } from 'react';
import s from './Contact.module.css';

export default function Contact({ id, name, number }) {
  const { token } = useSelector(state => state);
  const [showModal, setShowModal] = useState(false);
  const [deleteContact, {isLoading}] = useDeleteContactMutation();
    
    const togleModal = () => {
    setShowModal(showModal => !showModal);
  };
  
  const removeContact = (id) => {
    deleteContact({id, token})
    toast.success('delete is complete');
  }
  
  return (
    <div className={s.contact}>
      <span>
        {name} : {number}
      </span>
      {isLoading && <Spiner size={12} />}
      {showModal && (<Modal onClose={togleModal}>
        <ContactForm onClose={togleModal} nameCont={name} numberCont={number} id={id} />
      </Modal>)}
      <div>
        <Button type="button"
          className={s.contact_button} onClick={() => togleModal()} disabled={isLoading}>
          <BsPenFill />
        </Button>
        <Button type="button"
          className={s.contact_button} onClick={() => removeContact(id)} disabled={isLoading}>
          <BsFillTrashFill />
        </Button>
      </div>
    </div>
  );
}
