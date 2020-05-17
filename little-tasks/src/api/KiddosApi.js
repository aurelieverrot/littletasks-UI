import axios from 'axios';
axios.defaults.withCredentials = true;

let endpoint = 'http://localhost:4000/api/v1/kiddos'

const kiddosIndex = () => {
  return axios.get(endpoint)
}

export default {
  kiddosIndex
}
