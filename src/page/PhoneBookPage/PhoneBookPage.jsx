import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';
import ContactForm from 'components/ContactForm/ContactForm';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { BsPersonPlusFill } from "react-icons/bs";
import Modal from 'components/Modal/Modal';
import s from './PhoneBookPage.module.css'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function PhoneBookPage() {
    const [showModal, setShowModal] = useState(false);
    const {isLoggedIn} = useSelector(state=>state)
    const navigate = useNavigate();

    useEffect(() => {
    !isLoggedIn&&navigate('/login')
},[isLoggedIn, navigate])

    const togleModal = () => {
    setShowModal(showModal => !showModal);
  };

    return (<div className={s.page}>
        <h1>Phonebook</h1>
        <Button
            variant="primary"
            tupe='button'
            onClick={togleModal}>
            <div className={s.add_button}>
                <BsPersonPlusFill />
                <span>
            Add Contact
                </span>
            </div>
        </Button>
        {showModal && (<Modal onClose={togleModal}>
            <ContactForm onClose={togleModal}/>
        </Modal>)}        
        <Filter />
        <h2>Contacts :</h2>
        <ContactList />
    </div>);

}

export default PhoneBookPage