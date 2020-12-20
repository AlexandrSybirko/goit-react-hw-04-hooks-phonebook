import { useState, useEffect, useRef } from 'react';
import shortid from 'shortid';
import Section from './components/Section/Section'
import ContactForm from './components/ContactForm/ContactForm'
import ContactList from './components/ContactList/ContactList'
import Filter from './components/Filter/Filter'

const initialContacts = [
  { id: 'id-1', name: 'Elon Mask', number: '10664888778' },
  { id: 'id-2', name: 'Lena Kharchenko', number: '380664969795' },
  { id: 'id-3', name: 'Bill Gates', number: '10662475771' },
  { id: 'id-4', name: 'Mark Zuckerberg ', number: '10625884318' },
];

function App()  {
  const [contacts, setContacts] = useState(initialContacts);
  const [filter, setFilter] = useState('');
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

      if (parsedContacts) {
        setContacts(parsedContacts);
      }

      isFirstRender.current = false;
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
   
    const newContact = {
      id: shortid.generate(),
      name,
      number,
    }

    if (name === '' || number === '') {
      alert(`NO DATA.`)
      return;
    }


    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts.`)
      return;
    }

    setContacts(prevContacts => [newContact, ...prevContacts]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value );
  };
  
  const getVisibleContacts = () => {
    
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };
 
  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  
  
    return (
      <>
      <Section title="Phonebook">
          <ContactForm onSubmit={addContact} />
      </Section>
      <Section title="Phonebook">
      <Filter value={filter} onChange={changeFilter}/>
          <ContactList contacts={getVisibleContacts()} onDeleteContact={deleteContact} />
          </Section>
      </>
    );
  }


export default App;