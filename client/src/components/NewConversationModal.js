import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "../context/ContactsProvider";
import { useConversations } from "../context/ConversationsProvider";

export default function NewConversationModal({ closeModal }) {
	const [selectedContactIds, setSelectedContactIds] = useState([]);
	const { contacts } = useContacts();
	const { createConversation } = useConversations();

	const handleSubmit = (e) => {
		e.preventDefault();

		createConversation(selectedContactIds);
		closeModal();
	};

	const handleCheckBox = (contactId) => {
		setSelectedContactIds((prevSelectedContactIds) => {
			if (prevSelectedContactIds.includes(contactId)) {
				return prevSelectedContactIds.filter((cId) => {
					return cId !== contactId;
				});
			} else {
				return [...prevSelectedContactIds, contactId];
			}
		});
	};

	return (
		<>
			<Modal.Header>Create Conversation</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					{contacts.map((contact) => (
						<Form.Group controlId={contact.id} key={contact.id}>
							<Form.Check
								type="checkbox"
								value={selectedContactIds.includes(contact.id)}
								label={contact.name}
								onChange={() => {
									handleCheckBox(contact.id);
								}}
							/>
						</Form.Group>
					))}
					<Button type="submit" className="mt-3" style={{ marginRight: "10px" }}>
						Start Conversation
					</Button>
					<Button variant="secondary" className="mt-3" onClick={closeModal}>
						Cancel
					</Button>
				</Form>
			</Modal.Body>
		</>
	);
}
