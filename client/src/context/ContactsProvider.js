import React, { useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ContactsContext = React.createContext();

export function useContacts() {
	return useContext(ContactsContext);
}

export function ContactsProvider({ children }) {
	const [contacts, setContacts] = useLocalStorage("contacts", []);

	const createContact = (id, name) => {
		setContacts((prevContacts) => {
			if (prevContacts == null) return [{ id, name }];
			return [...prevContacts, { id, name }];
		});
	};

	return <ContactsContext.Provider value={{ contacts, createContact }}>{children}</ContactsContext.Provider>;
}
