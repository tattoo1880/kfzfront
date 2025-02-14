import axios from 'axios';
import { useTokenStore } from '@/stores/token';
import ApiUrl from './ApiUrl';



export const myfectch = axios.create({
    timeout: 10000,
    baseURL: `${ApiUrl}`,
    // baseURL: 'http://185.200.64.73:8083',    

})

