import Axios from 'axios';

const API = Axios.create({
    baseURL:"http://127.0.0.1:7700/api",
    timeout:3000,
})

export default API;