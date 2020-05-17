import axios from 'axios';
axios.defaults.withCredentials = true;

let endpoint = 'http://localhost:4000/api/v1/tasks'

const tasksIndex = () => {
  return axios.get(endpoint)
}

const tasksCreate = (info) => {
  return axios.post(endpoint, info)
}

export default {
  tasksIndex,
  tasksCreate
}