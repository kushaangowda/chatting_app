import React, { useState, useCallback } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useConversations } from "../context/ConversationsProvider";

export default function OpenConversation() {
	const [text, setText] = useState("");
	const { sendMessage, selectedConversation } = useConversations();
	const setRef = useCallback((node) => {
		if (node) node.scrollIntoView({ smooth: true });
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		sendMessage(
			selectedConversation.recipients.map((r) => r.id),
			text
		);
		setText("");
	};

	return (
		<div className="d-flex flex-column flex-grow-1">
			<div className="flex-grow-1 overflow-auto">
				<div
					className="d-flex flex-column align-items-start justify-content-end px-3"
					style={{ minHeight: "100%" }}
				>
					{selectedConversation.messages.map((message, index) => {
						const lastMessage = selectedConversation.messages.length - 1 === index;
						return (
							<div
								ref={lastMessage ? setRef : null}
								key={index}
								className={
									"mt-3 d-flex flex-column " +
									(message.fromMe ? "align-self-end align-items-end" : "align-items-start")
								}
							>
								<div className={"rounded p-2 " + (message.fromMe ? "bg-primary text-white" : "border")}>
									{message.text}
								</div>
								<div className="text-muted small" style={message.fromMe ? { textAlign: "right" } : {}}>
									{message.fromMe ? "You" : message.senderName}
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<Form onSubmit={handleSubmit}>
				<Form.Group className="m-2">
					<InputGroup>
						<Form.Control
							as="textarea"
							required
							value={text}
							style={{ height: "75px", resize: "none" }}
							onChange={(e) => setText(e.target.value)}
						/>
						<InputGroup.Append>
							<Button
								style={{ height: "100%", borderTopLeftRadius: "0", borderBottomLeftRadius: 0 }}
								type="submit"
							>
								Send
							</Button>
						</InputGroup.Append>
					</InputGroup>
				</Form.Group>
			</Form>
		</div>
	);
}
