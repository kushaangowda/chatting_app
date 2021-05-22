import React, { useState } from "react";
import { Tab, Nav, Button, Modal } from "react-bootstrap";
import Conversation from "./Conversation";
import Contact from "./Contact";
import NewContactModal from "./NewContactModal";
import NewConversationModal from "./NewConversationModal";

const CONVERSATIONS_KEY = "conversations";
const CONTACTS_KEY = "contacts";

export default function Sidebar({ id }) {
	const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);
	const [modalOpen, setModalOpen] = useState(false);
	const convOpen = activeKey === CONVERSATIONS_KEY;

	const closeModal = () => {
		setModalOpen(false);
	};

	const openModal = () => {
		setModalOpen(true);
	};

	return (
		<div style={{ width: "250px" }} className="d-flex flex-column">
			<Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
				<Nav variant="tabs" className="justify-content-center">
					<Nav.Item>
						<Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
					</Nav.Item>
				</Nav>
				<Tab.Content className="overflow-auto flex-grow-1" style={{ borderRight: "1px solid rgba(0,0,0,0.2)" }}>
					<Tab.Pane eventKey={CONVERSATIONS_KEY}>
						<Conversation />
					</Tab.Pane>
					<Tab.Pane eventKey={CONTACTS_KEY}>
						<Contact />
					</Tab.Pane>
				</Tab.Content>
				<div
					className="p-2 small"
					style={{ borderRight: "1px solid rgba(0,0,0,0.2)", borderTop: "1px solid rgba(0,0,0,0.2)" }}
				>
					Your Id: <span className="text-muted">{id}</span>
				</div>
				<Button className="rounded-0" onClick={openModal}>
					New {convOpen ? "Conversation" : "Contact"}
				</Button>
			</Tab.Container>
			<Modal show={modalOpen} onHide={closeModal}>
				{convOpen ? (
					<NewConversationModal closeModal={closeModal} />
				) : (
					<NewContactModal closeModal={closeModal} />
				)}
			</Modal>
		</div>
	);
}
