import axios from 'axios';


export const myfectch = axios.create({
    timeout: 10000,
    // baseURL: 'http://127.0.0.1:8083',
    baseURL: 'http://185.200.64.73:8083',
    // !header
})