import React,{useState} from 'react';

import Profile from '../../assets/image/download.jpeg';
import socketIOClient from 'socket.io-client';
import common from '../../constant/common';
const ENDPOINT = common.socket_base_url;
var socket;
function UserList(data) {
	// const [group, setgroup] = useState()
    	socket = socketIOClient(ENDPOINT);
		socket.on('groupjoin', function (data) {
			console.log('data :>> ', data);
		});
	let i = 1;
	const grp = data.group;
	console.log('data', data);
	let lidata =
		grp &&
		grp?.map((users) => (
			<li key={users._id} className="inline-block shadow-lg p-3 m-2 bg-green-300">
				<div className="w-12 float-left text-center p-2">{i++}</div>
				<div className="w-25 float-left pl-5 w-20 opacity-1">
					<p>{users.name}</p>
					<p>Point 0</p>
				</div>
				<div className="w-18 float-left pl-5">
					<img className="h-12 float-left" src={Profile} alt="demo" />
				</div>
			</li>
		));

	return <ul className="list bg-gray-500">{lidata}</ul>;
}
export default UserList;
