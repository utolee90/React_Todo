import Axios from 'axios';

const API = Axios.create({
    baseURL:"http://3.35.93.67/api",
    //baseURL:'http://localhost:8000/api',
    timeout:3000,
})

export default API;