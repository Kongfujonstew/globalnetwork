import axios from 'axios';
const url = window.location;

const getUsers = () => {
  return axios.get(url + 'users' , {
    headers: { 'Content-Type': 'application/json' },
  })
}

const createAndLoginUser = (name) => {
  return axios.post(url + 'users' , {
    headers: { 'Content-Type': 'application/json' },
    name,
    you: true
  })
}

const makeUser = (name) => {
  return axios.post(url + 'users' , {
    headers: { 'Content-Type': 'application/json' },
    name
  })
}

const deleteUser = (id) => {
  return axios.post(url + 'delete' , {
    headers: { 'Content-Type': 'application/json' },
    id
  })
}

export default {
  createAndLoginUser,
  deleteUser,
  getUsers,
  makeUser
}