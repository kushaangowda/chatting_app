import React, { useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { v4 as uuidV4 } from "uuid";

export default function Login({ setId }) {
	const idRef = useRef();

	const handleSubmit = (e) => {
		e.preventDefault();
		setId(idRef.current.value);
	};

	const createNewId = () => {
		setId(uuidV4());
	};

	return (
		<Container className="align-items-center d-flex" style={{ height: "100vh" }}>
			<Form onSubmit={handleSubmit} className="w-100">
				<Form.Group className="mb-3">
					<Form.Label>Enter your ID</Form.Label>
					<Form.Control type="text" ref={idRef} required />
				</Form.Group>
				<Button type="submit" style={{ marginRight: "15px" }}>
					Login
				</Button>
				<Button variant="secondary" onClick={createNewId}>
					Create A New ID
				</Button>
			</Form>
		</Container>
	);
}
