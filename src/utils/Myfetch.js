import axios from 'axios';
import { useTokenStore } from '@/stores/token';

const tokenStore = useTokenStore();
const jwt = tokenStore.getToken();

console.log('jwt', jwt);


export const myfectch = axios.create({
    timeout: 10000,
    baseURL: 'http://127.0.0.1:8083',
    // baseURL: 'http://185.200.64.73:8083',    

})

myfectch.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;