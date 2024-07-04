const BASE_URL = 'http://localhost:3029/api/v1';

export const fetchJoinRoom = async (data) => {
	const response = await fetch(`${BASE_URL}/room`, {
		body: JSON.stringify(data),
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
	});
	const resp = await response.json();
	return resp;
};
