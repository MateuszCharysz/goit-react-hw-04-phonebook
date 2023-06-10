import React, { useState, useEffect } from 'react';
import { Form } from './form/form';
import Input from './input/input';
import ContactList from './contact-list/contact-list';
import css from './App.module.css';
import { nanoid } from 'nanoid';
import JsLocalStorage from './JsLocalStorage';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const filterHandler = e => {
    const { name, value } = e.target;
    if (name === 'filter') {
      setFilter(value);
    }
  };

  const filterContacts = () =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );

  const deleteContact = id => {
    setContacts([...contacts.filter(contact => contact.id !== id)]);
  };

  const submitForm = callback => {
    if (
      contacts.filter(contact => contact.name === callback.name).length !== 1
    ) {
      let formState = { id: idCreate(), ...callback };
      setContacts([...contacts, formState]);
    } else {
      alert(`${callback.name} is already in contacts.`);
    }
  };

  const idCreate = () => nanoid();

  // useEffect((key = 'contacts') => {
  //   if (localStorage.getItem(key) !== null) {
  //     const lsState = JsLocalStorage.load(key);
  //     console.log(lsState);
  //     console.log(localStorage.getItem(key));
  //     setContacts([...lsState]);
  //     console.log('onMOunt'); //TODO do usuniecia
  //   }
  // }, []);

  useEffect(
    (key = 'contacts') => {
      // console.log(JSON.stringify(JsLocalStorage.load(key)));
      // console.log(JSON.stringify(contacts));
      console.log(JSON.stringify(JsLocalStorage.load(key)) !== JSON.stringify(contacts));
      if (
        JSON.stringify(JsLocalStorage.load(key)) !== JSON.stringify(contacts)
      ) {
        if (localStorage.getItem(key) !== null) {
          const lsState = JsLocalStorage.load(key);
          setContacts([...lsState]);
          console.log('onupdate'); //TODO do usuniecia
        } else {
          JsLocalStorage.save(key, contacts);
          console.log('onMount'); //TODO do usuniecia

        }
      }
    },
    [contacts],
  );

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <Form handler={submitForm} />
      <h2>Contacts</h2>
      <Input
        label="Find contacts by name"
        type="text"
        dataName="filter"
        validation="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Search is not case sensitive"
        funcChange={filterHandler}
        stateField={filter}
      />
      <ContactList arr={filterContacts()} btnHandler={deleteContact} />
    </div>
  );
};

export default App;
