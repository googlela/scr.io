import axios from 'axios'
const commonUrl='http://localhost:3010/api/v1/'
async function Get(data){
let postBody ={
    name:data
}
console.log('postBody', postBody)
axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
return await axios.get(commonUrl+'user/group/join',{name:postBody})

}

export default Get;