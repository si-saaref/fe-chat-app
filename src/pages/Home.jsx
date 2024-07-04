export default function Home() {
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
					/>
					{/* <label className='absolute left-0 top-0 text-[#BDBDBD]' htmlFor='username'>
						Username
					</label> */}
				</div>
				<div className='relative w-full'>
					<input
						type='text'
						id='roomId'
						className='bg-[#E8E8E8] p-2 rounded-md w-full'
						placeholder='Room ID'
					/>
					{/* <label className='absolute left-0 top-0 text-[#BDBDBD]' htmlFor='roomId'>
						Room ID
					</label> */}
				</div>
			</div>
			<button className='bg-green-600 w-full rounded-full text-white p-3 font-bold'>Join</button>
		</main>
	);
}
