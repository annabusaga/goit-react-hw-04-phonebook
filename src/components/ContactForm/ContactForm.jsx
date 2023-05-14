import React, { useState } from 'react';
import css from './ContactForm.module.css';

const ContactForm = ({ onSubmit, addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handlerInput = event => {
    switch (event.target.name) {
      case 'name':
        setName(event.target.value);

        break;
      case 'number':
        setNumber(event.target.value);
        break;

      default:
        break;
    }
  };

  const handlerSubmit = event => {
    event.preventDefault();

    onSubmit({ name, number });
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <div className={css.container}>
      <form className={css.form} onSubmit={handlerSubmit}>
        <label className={css.name} htmlFor="">
          Name
          <input
            placeholder="Enter your name"
            type="text"
            name="name"
            value={name}
            onChange={handlerInput}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>

        <label className={css.number} htmlFor="">
          Number
          <input
            placeholder="Enter your number"
            type="tel"
            value={number}
            onChange={handlerInput}
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button className={css.button} type="submit">
          Add Contact
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
