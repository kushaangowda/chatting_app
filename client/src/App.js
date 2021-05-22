import Login from "./components/Login";
import React from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import Dashboard from "./components/Dashboard";
import { ContactsProvider } from "./context/ContactsProvider";
import { ConversationsProvider } from "./context/ConversationsProvider";
import { SocketProvider } from "./context/SocketProvider";

function App() {
	const [id, setId] = useLocalStorage("id");

	const dashboard = (
		<SocketProvider id={id}>
			<ContactsProvider>
				<ConversationsProvider id={id}>
					<Dashboard id={id} />
				</ConversationsProvider>
			</ContactsProvider>
		</SocketProvider>
	);

	return <div className="App">{id ? dashboard : <Login setId={setId} />}</div>;
}

export default App;
