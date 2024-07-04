import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchJoinRoom } from '../service';

export default function Home() {
	const [username, setUsername] = useState('');
	const [roomId, setRoomId] = useState('');
	const navigate = useNavigate();

	const joinChatRoom = async () => {
		try {
			const data = {
				username: username.replace(/\s/g, ''),
				roomId: roomId.trim(),
			};
			if (data.username.length === 0) {
				alert('Username should not be empty');
			}
			if (data.roomId.length === 0) {
				alert('Room Id should not be empty');
			}
			const resp = await fetchJoinRoom(data);

			if (resp.code !== 201) {
				alert(resp.message);
			} else {
				localStorage.setItem(
					'roomChat',
					JSON.stringify({
						username: username.replace(/\s/g, ''),
						roomId: resp.data._id,
					})
				);
				navigate(`/${resp.data.roomId}`);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<main className='bg-white w-1/3 p-5 flex flex-col justify-between gap-14 items-center'>
			<h1 className='text-3xl font-semibold'>Join Chatroom</h1>
			<div className='flex-1 w-full flex flex-col gap-8'>
				<div className='relative w-full'>
					<input
						type='text'
						id='username'
						className='bg-[#E8E8E8] p-2 rounded-md w-full'
						placeholder='Username'
						value={username}
						onChange={(ev) => setUsername(ev.target.value)}
					/>
				</div>
				<div className='relative w-full'>
					<input
						type='text'
						id='roomId'
						className='bg-[#E8E8E8] p-2 rounded-md w-full'
						placeholder='Room ID'
						value={roomId}
						onChange={(ev) => setRoomId(ev.target.value)}
					/>
				</div>
			</div>
			<button
				className='bg-green-600 w-full rounded-full text-white p-3 font-bold'
				onClick={joinChatRoom}
			>
				Join
			</button>
		</main>
	);
}
