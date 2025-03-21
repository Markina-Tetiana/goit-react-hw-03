import { useEffect, useState } from "react";
import "./App.css";
import ContactForm from "./components/ContactForm/ContactForm";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactList from "./components/ContactList/ContactList";

const initialContacts = [
  { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
  { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
  { id: "id-3", name: "Eden Clements", number: "645-17-79" },
  { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
];

function App() {
  const [contacts, setContacts] = useState(() => {
    return localStorage.getItem("contacts")
      ? JSON.parse(localStorage.getItem("contacts"))
      : initialContacts;
  });
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);
  const addContact = (newContact) => {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const [filter, setFilter] = useState("");
  const handleFilter = () => {
    setFilter(event.target.value);
  };
  const filteredContact = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };
  return (
    <div>
      <h1>PhoneBook</h1>
      <ContactForm onAddContact={addContact} />
      <SearchBox value={filter} onChange={handleFilter} />
      <ContactList contacts={filteredContact} onDelete={deleteContact} />
    </div>
  );
}

export default App;
