import { ButtonStyled } from './Contact.styled';
import { useDeleteContactMutation} from 'services/contactsApi'
import toast from 'react-hot-toast';
import Spiner from "components/Spiner/Spiner"

export default function Contact({ id, name, phone }) {
  
  const [deleteContact, {isLoading}] = useDeleteContactMutation();
  
  const removeContact = (id) => {
    deleteContact(id)
    toast.success('delete is complete');
  }
  return (
    <>
      <span>
        {name} : {phone}
      </span>
      <ButtonStyled type="button" onClick={() => removeContact(id)} disabled={isLoading}>
        {isLoading && <Spiner size={12}/>}
        Delete
      </ButtonStyled>
    </>
  );
}
