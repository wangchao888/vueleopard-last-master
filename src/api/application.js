import _axios from "./commonApi.js";

let serverurl = _axios.defaults.baseURL;

export const queryApplication = params => {
  return _axios.post(serverurl+'/application/querylist',params, {
    headers: {
      "Authorization": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJsb2dpbm5hbWVcIjpcIjAwMDAwMFwiLFwidXNlcmlkXCI6XCI3N0YxNzdGQjc0Njc1QjIwRTA1MEE4QzAwNDAwN0E1RlwifSIsImV4cCI6MTU0Mjc2NTEyMH0.PNtm9PW2bU8JHaZ6HOVedbOi1zcMYSCREDUTJ8SIlQQ"
    }
  }).then(res => res.data)
};

export const addApplication = params => {
  return _axios.post(serverurl+'/application/add', params).then(res => res.data)
};
