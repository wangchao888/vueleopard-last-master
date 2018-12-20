import axios from 'axios'

var _axios = axios;
_axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

export default _axios;
