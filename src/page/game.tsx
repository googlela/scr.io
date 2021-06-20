import { useEffect } from 'react';
import Draw from '../components/Draw';
import Chat from '../components/Chat';
import Users from '../components/Users';
import common from '../constant/common';
import { Get } from '../API';
import Cookies from 'universal-cookie';
import { useState } from 'react';
let cookie = new Cookies();
let grpId = cookie.get('groupId');
const Game = () => {
	const [group, setgroup] = useState('');
	useEffect(() => {
		getGroup();
	}, []);
	async function getGroup() {
		try {
			let group = await Get(common.common_url + common.group_get + grpId);
			setgroup(group.data.userList);
		} catch (e) {
			console.log('e :>> ', e);
		}
	}
	return (
		<div className="md:container md:mx-auto px-3">
			
			<div className="grid grid-cols-12 gap-4 ">
				<div className="userlist col-span-3">
					<Users group={group && group} />
				</div>
				<div className="draw col-span-6">
					<Draw />
				</div>
				<div className="chat col-span-3">
					<Chat />
				</div>
			</div>
		</div>
	);
};
export default Game;
