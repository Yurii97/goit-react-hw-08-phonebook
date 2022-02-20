import { Toaster } from 'react-hot-toast';
import { Routes, Route, Link } from "react-router-dom";
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';
import ContactForm from './components/ContactForm/ContactForm';

function App() {
  
  return (
    <>
      {/* <Routes> */}
        <Toaster />
        <h1>Phonebook</h1>
        <ContactForm />
        <h2>Contacts</h2>
        <Filter />
        <ContactList />
      {/* </Routes> */}
    </>
  );
}

export default App;
