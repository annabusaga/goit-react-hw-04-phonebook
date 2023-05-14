import { useEffect, useState } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import shortid from 'shortid';
import Filter from '../Filter/Filter';
import css from './App.module.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');



  
  // під капотом useState([]);

  //   useState([2]);

  //   function useState(initialValue) {
  //     let contacts = initialValue;
  //     function setContacts(newValue) {
  //       contacts = newValue;
  //     }
  //     return [contacts, setContacts];
  //   }

  useEffect(() => {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [
      {
        id: 'id-1',
        name: 'Rosie Simpson',
        number: '459-12-56',
      },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ];
    setContacts(contacts);
  }, []);

  useEffect(() => {
    contacts && localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = ({ name, number }) => {
    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }
    addContact({ name, number });
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const addContact = ({ name, number }) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };
    setContacts(prevContactState => [contact, ...prevContactState]);
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  // const normalizedFilter = this.state.filter.toLowerCase();
  const visibleContact = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <div>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} addContact={addContact} />

      <h2 className={css.title}>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      {/* <Filter/> */}
      <ContactList contacts={visibleContact} onDeleteTodo={deleteContact} />
    </div>
  );
};

export default App;
