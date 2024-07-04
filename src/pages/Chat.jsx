import { useCallback, useEffect, useState } from 'react';
import { getAllMessages, sendMessage } from '../service';
import { IoMdArrowUp } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

export default function Chat() {
	const [data, setData] = useState([]);
	const [roomName, setRoomName] = useState('');
	const [username, setUsername] = useState('');
	const [message, setMessage] = useState('');
	const navigate = useNavigate();

	const handleFetchAllMessages = useCallback(async (roomId) => {
		try {
			const resp = await getAllMessages(roomId);
			setData(resp.data);
			setRoomName(resp.roomId);
		} catch (error) {
			console.log(error);
		}
	}, []);

	const handleSendMessage = async () => {
		try {
			if (message.replace(/\s/g, '').length === 0) {
				alert('Message should not be empty');
			}

			const dataRoom = JSON.parse(localStorage.getItem('roomChat'));
			const data = {
				roomId: dataRoom.roomId,
				message,
				username: dataRoom.username.replace(/\s/g, ''),
			};
			const resp = await sendMessage(data);

			if (resp.code === 201) {
				await handleFetchAllMessages(dataRoom.roomId);
				setMessage('');
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const dataRoom = JSON.parse(localStorage.getItem('roomChat'));
		setUsername(dataRoom.username);
		handleFetchAllMessages(dataRoom.roomId);
	}, [handleFetchAllMessages]);

	return (
		<main className='bg-white w-1/3 p-5 flex flex-col justify-between gap-10 items-center'>
			<div className='flex w-full items-center'>
				<button
					className='self-start text-xl text-[#5DB075]'
					onClick={() => {
						navigate(-1);
					}}
				>
					Exit
				</button>
				<h1 className='text-3xl flex-1 self-center font-semibold text-center'>{roomName}</h1>
			</div>

			<div className='flex flex-col gap-3 w-full flex-1 justify-end overflow-auto p-1'>
				{data.length !== 0 &&
					data?.map((message) => {
						return (
							<div
								key={message?._id}
								className={`${
									message?.sender?.username !== username ? 'self-start' : 'self-end'
								} w-3/5`}
							>
								{message?.sender?.username !== username && (
									<p className='px-1'>{message?.sender?.username ?? 'Anonymous'}</p>
								)}
								<div
									className={`rounded-lg p-4 ${
										message?.sender?.username === username
											? 'bg-[#5DB075] text-white'
											: ' bg-[#F6F6F6] border-[#E8E8E8] border'
									}`}
								>
									{message.message}
								</div>
							</div>
						);
					})}
			</div>
			<div className='w-full justify-between flex gap-4 relative'>
				<input
					type='text'
					name='message'
					id='message'
					placeholder='Type message'
					className='bg-[#F6F6F6] w-full border border-[#E8E8E8] rounded-full p-2 pl-3 pr-11'
					value={message}
					onChange={(ev) => setMessage(ev.target.value)}
				/>
				<button
					className='bg-[#5DB075] text-white rounded-full p-1 absolute right-2 top-1/2 -translate-y-1/2'
					onClick={handleSendMessage}
				>
					<IoMdArrowUp className='text-2xl' />
				</button>
			</div>
		</main>
	);
}
