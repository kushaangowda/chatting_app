import { useEffect, useState } from "react";

const PREFIX = "chatting-application-";

export default function useLocalStorage(key, initialValue) {
	const prefixedKey = PREFIX + key;
	const [value, setValue] = useState(() => {
		const jsonValue = localStorage.getItem(prefixedKey);
		console.log(jsonValue);
		if (jsonValue != "undefined") return JSON.parse(jsonValue);
		if (typeof initialValue === "function") return initialValue();
		else return initialValue;
	});

	useEffect(() => {
		localStorage.setItem(prefixedKey, JSON.stringify(value));
	}, [value, prefixedKey]);

	return [value, setValue];
}
