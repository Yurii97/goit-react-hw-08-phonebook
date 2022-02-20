import Contact from 'components/Contact/Contact';
import { ListStyled, ErrorMasage } from './ContactList.styled';
import {   useSelector } from 'react-redux'
import Spiner from "components/Spiner/Spiner"
import {useGetContactQuery, } from 'services/contactsApi'

export default function ContactList() {
  const { filter} = useSelector(state=>state)
  
  const { data, error, isError, isFetching } = useGetContactQuery();
  
  
  return (
    <>
      <section>
        {isFetching && <Spiner size={50}/>}
        {isError && <ErrorMasage>{error.error}</ErrorMasage>}
        {data && !isError && <ListStyled>
          {data.length > 0 && data
            .filter(contact =>
              contact.name.toLowerCase().includes(filter.toLowerCase())
            )
            .map(({ id, name, phone }) => (
              <li key={id}>
                <Contact
                  id={id}
                  name={name}
                  phone={phone}
                />
              </li>
            ))}
        </ListStyled>}
      </section>
    </>
  );
}
