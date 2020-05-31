import axios from 'axios';
axios.defaults.withCredentials = true;

let endpoint = 'http://localhost:4000/api/v1/tasks'

const tasksIndex = () => {
  return axios.get(endpoint)
}

const tasksCreate = (info) => {
  return axios.post(endpoint, info)
}

const tasksUpdate = (_id, info) => {
  return axios.put(`${endpoint}/${_id}`, info)
}

const tasksDelete = (_id) => {
  return axios.delete(`${endpoint}/${_id}`)
}


export default {
  tasksIndex,
  tasksCreate,
  tasksUpdate,
  tasksDelete
}