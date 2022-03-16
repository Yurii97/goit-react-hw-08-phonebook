import Contact from 'components/Contact/Contact';
import { ListStyled, ErrorMasage } from './ContactList.styled';
import {   useSelector } from 'react-redux'
import Spiner from "components/Spiner/Spiner"
import {useGetContactsQuery, } from 'services/contactsApi'

export default function ContactList() {
  const { filter, token} = useSelector(state=>state)
  const { data, error, isError, isFetching } = useGetContactsQuery(token);
  
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
            .map(({ id, name, number }) => (
              <li key={id}>
                <Contact
                  id={id}
                  name={name}
                  number={number}
                />
              </li>
            ))}
        </ListStyled>}
      </section>
    </>
  );
}
