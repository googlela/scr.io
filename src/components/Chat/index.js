import Cookies from 'universal-cookie';
const cookies = new Cookies();
const name = cookies.get('name');

const Chat = () => {
	return (
		<div className="chatbot border-2">
			<div className="header w-full  p-2 border-b-2">welcome to chat</div>
			<div className="message-box h-96 overflow-y-scroll p-2">
				<ul className="p-2">
					<li>
						<p>{name} : </p>
						<p>aaa</p>
					</li>
					<li>abc</li>
					<li>abc</li>
					<li>abc</li>
					<li>abc</li>
					<li>abc</li>
				</ul>
			</div>
			<div className="chat-text w-full p-1 p-t-2 bg-gray-400">
				<div className="grid grid-cols-1 ">
					<input
						type="text"
						className="px-3 py-3 w-full  text-blueGray-600 relative bg-white  rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring float-left bg-g"
						placeholder="chat"
					/>
				</div>
			</div>
		</div>
	);
};
export default Chat;
