import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();

const Home = () => {
	let history = useHistory();
	const [name, setName] = useState('');
	const [error, setError] = useState('');
	function handleChange(e: any) {
		setName(e.target.value);
	}
	function click(e:any) {
		e.preventDefault();
		if (name === '') {
			setError("please enter Name")
		} else {
			cookies.set('name', name);
			history.push('/game');
		}
	}
	return (
		<div className="absolute h-1/3 inset-y-1/4 inset-x-1/4 w-1/2 shadow-md filter drop-shadow-md p-2 bg-gradient-to-r from-red-400 to-green-500">
			<form className="justify-center">
				<div>
					<div className="flex ">
						<div className="w-1/3 m-4 ">
							<label
								htmlFor="name"
								className="block text-xl font-medium text-gray-700 float-right relative top-1 transition-colors .animate-bounce"
							>
								Full Name:
							</label>
						</div>
						<div className="w-1/2 m-4">
							<input
								type="text"
								name="name"
								id="name"
								className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
								placeholder="name"
								onChange={handleChange}
							/>
							<span className="text-red-600">{error}</span>
						</div>
					</div>
				</div>
				<div className="btn-input text-center">
					<button
						className=" bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white font-bold py-2 px-4 rounded"
						onClick={click}
					>
						Play
					</button>
				</div>
			</form>
		</div>
	);
};
export default Home;
