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

export const getAllMessages = async (roomId) => {
	const response = await fetch(`${BASE_URL}/message/${roomId}`, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
		},
	});

	return await response.json();
};

export const sendMessage = async (data) => {
	const { roomId, ...restData } = data;
	const response = await fetch(`${BASE_URL}/message/${roomId}`, {
		body: JSON.stringify(restData),
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
	});
	return await response.json();
};
