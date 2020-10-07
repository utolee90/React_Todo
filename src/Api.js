import Axios from 'axios';

const API = Axios.create({
    baseURL:"http://3.35.93.67/api",
    timeout:3000,
})

export default API;