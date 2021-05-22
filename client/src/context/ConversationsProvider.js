import React, { useContext, useEffect, useState, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from "./ContactsProvider";
import { useSocket } from "./SocketProvider";

const ConversationsContext = React.createContext();

export function useConversations() {
	return useContext(ConversationsContext);
}

export function ConversationsProvider({ id, children }) {
	const [conversations, setConversations] = useLocalStorage("conversations", []);
	const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
	const { contacts } = useContacts();
	const socket = useSocket();

	const createConversation = (recipients) => {
		setConversations((prevConversations) => {
			if (prevConversations == null) return [{ recipients, messages: [] }];
			return [...prevConversations, { recipients, messages: [] }];
		});
	};

	const addMessage = useCallback(
		({ recipients, text, sender }) => {
			console.log("Hi");
			console.log(recipients, text, sender);
			setConversations((prevConvs) => {
				let makeChange = false;
				const newMessage = { sender, text };
				var newConversations = [];
				if (prevConvs) {
					newConversations = prevConvs.map((conv) => {
						if (arrayEqual(conv.recipients, recipients)) {
							makeChange = true;
							return {
								...conv,
								messages: [...conv.messages, newMessage],
							};
						} else {
							return conv;
						}
					});
				}

				if (makeChange) {
					return newConversations;
				} else {
					if (prevConvs) return [...prevConvs, { recipients, messages: [newMessage] }];
					else return [{ recipients, messages: [newMessage] }];
				}
			});
		},
		[setConversations]
	);

	useEffect(() => {
		if (socket == null) return;
		console.log("receiving");
		socket.on("receive-message", addMessage);

		return () => socket.off("receive-message");
	}, [socket, addMessage]);

	const sendMessage = (recipients, text) => {
		console.log(recipients, text);
		socket.emit("send-message", { recipients, text });
		addMessage({ recipients, text, sender: id });
	};

	const formattedConversations =
		conversations != null
			? conversations.map((conversation, index) => {
					console.log(conversation);
					const recipients = conversation.recipients.map((recipient) => {
						var contact = null;
						if (contacts) {
							contact = contacts.find((contact) => {
								return contact.id === recipient;
							});
						}
						const name = (contact && contact.name) || recipient;
						return { id: recipient, name };
					});
					const messages = conversation.messages.map((message) => {
						var contact = null;
						if (contacts) {
							contact = contacts.find((contact) => {
								return contact.id === message.sender;
							});
						}
						const name = (contact && contact.name) || message.sender;
						const fromMe = id === message.sender;
						return { ...message, senderName: name, fromMe };
					});
					const selected = index === selectedConversationIndex;
					return { ...conversations, messages, recipients, selected };
			  })
			: [];

	return (
		<ConversationsContext.Provider
			value={{
				selectedConversation: formattedConversations[selectedConversationIndex],
				selectConversationIndex: setSelectedConversationIndex,
				conversations: formattedConversations,
				createConversation,
				sendMessage,
			}}
		>
			{children}
		</ConversationsContext.Provider>
	);
}

const arrayEqual = (a1, a2) => {
	if (a1.length !== a2.length) return false;
	else {
		a1.sort();
		a2.sort();

		return a1.every((elem, index) => {
			return elem === a2[index];
		});
	}
};
