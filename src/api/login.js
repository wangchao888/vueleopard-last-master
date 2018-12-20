import _axios from "./commonApi.js";

let serverurl = _axios.defaults.baseURL;

export const userLogin = params => {
  return _axios.post(serverurl+'/login', params
  ).then(res => res.data)
};
