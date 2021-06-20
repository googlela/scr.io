import axios from 'axios';
async function Get(url) {
	return await axios.get(url);
}

export default Get;
