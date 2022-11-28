import axios from 'axios';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const api = {
  get: url => axios.get(url, config),
  post: (url, payload, customConfig) =>
    axios.post(url, payload, customConfig ? customConfig : config),
  patch: (url, payload) => axios.patch(url, payload, config),
  put: (url, payload) => axios.put(url, payload, config),
  delete: url => axios.delete(url, config),
};

export default api;
