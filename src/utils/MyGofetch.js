import axios from 'axios';
import GoGinApiUrl from './GoGinApiUrl';



export const mygofectch = axios.create({
    timeout: 10000,
    baseURL: `${GoGinApiUrl}`,

})

