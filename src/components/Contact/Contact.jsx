import { useDeleteContactMutation} from 'services/contactsApi'
import toast from 'react-hot-toast';
import Spiner from "components/Spiner/Spiner"
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import s from './Contact.module.css';
import { BsFillTrashFill, BsPenFill } from "react-icons/bs";
import Modal from 'components/Modal/Modal';
import ContactForm from 'components/ContactForm/ContactForm';
import { useState } from 'react';

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
  
  const renameContact = (id, name, number) => {
    console.log(number);
    console.log(name);
    togleModal();
  };

  return (
    <div className={s.contact}>
      <span>
        {name} : {number}
      </span>
      {isLoading && <Spiner size={12} />}
      {showModal && (<Modal onClose={togleModal}>
        <ContactForm onClose={togleModal} nameCont={name} numberCont={number} id={id}/>
        </Modal>)}
      <div>
      <Button type="button" className={s.button} onClick={() => renameContact(id, name, number)} disabled={isLoading} >
        {isLoading && <Spiner size={12}/>}
        <BsPenFill/>
      </Button>
      <Button type="button" className={s.button} onClick={() => removeContact(id)} disabled={isLoading}>
        <BsFillTrashFill/>
      </Button>
      </div>
    </div>
  );
}
