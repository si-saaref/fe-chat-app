import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Chat from './pages/Chat';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

function App() {
	const [socket, setSocket] = useState(null);

	const setUpSocket = () => {
		const newSocket = io('http://localhost:3029');

		newSocket.on('disconnect', () => {
			setSocket(null);
			setTimeout(setUpSocket, 3000);
		});

		newSocket.on('connect', () => {});

		setSocket(newSocket);
	};

	useEffect(() => {
		setUpSocket();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/:roomId' element={<Chat socket={socket} />} />
			</Routes>
		</Router>
	);
}

export default App;
