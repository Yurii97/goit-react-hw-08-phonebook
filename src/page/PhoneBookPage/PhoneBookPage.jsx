import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';
import ContactForm from 'components/ContactForm/ContactForm';
import { useState } from 'react';
import s from './PhoneBookPage.module.css'
import { Button } from 'react-bootstrap';
import { BsPersonPlusFill } from "react-icons/bs";
import Modal from 'components/Modal/Modal';

function PhoneBookPage() {
const [showModal, setShowModal] = useState(false);
    
    const togleModal = () => {
    setShowModal(showModal => !showModal);
  };

    return (<div className={s.page}>
        <h1>Phonebook</h1>
        <Button
            variant="primary"
            tupe='button'
            onClick={togleModal}
            className={s.button}>
            <BsPersonPlusFill /> Add Contact
        </Button>
        {showModal && (<Modal onClose={togleModal}>
            <ContactForm onClose={togleModal}/>
        </Modal>)}        
        <h2>Contacts</h2>
        <Filter />
        <ContactList />
    </div>);

}

export default PhoneBookPage