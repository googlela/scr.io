import Profile from '../assets/image/download.jpeg';
import Draw from '../components/Draw/index';
import Chat from '../components/Chat';
const Game = () => {
	return (
		<div className="md:container md:mx-auto p-1">
			<div className="grid grid-cols-3 gap-4">
				<div className=" bg-red-500 p-3 w-full">
					<ul>
						<li className="inline-block">
							<div className="w-12 float-left">#1</div>
							<div className="w-25 float-left pl-5">
								<p>Tushar</p>
								<p>Point 100</p>
							</div>
							<div className="w-18 float-left pl-5">
								<img className="h-12 float-left" src={Profile} alt="demo" />
							</div>
						</li>
						<li className="inline-block">
							<div className="w-12 float-left">#1</div>
							<div className="w-25 float-left pl-5">
								<p>Tushar</p>
								<p>Point 100</p>
							</div>
							<div className="w-18 float-left pl-5">
								<img className="h-12 float-left" src={Profile} alt="demo" />
							</div>
						</li>
					</ul>
				</div>
				<div className="draw">
					<Draw />
				</div>
				<div className="chat">
					<Chat />
				</div>
			</div>
		</div>
	);
};
export default Game;
