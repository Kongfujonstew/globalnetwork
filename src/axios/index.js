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

// const getRooms = () => {
//   return axios.get(url + 'rooms' , {
//     headers: { 'Content-Type': 'application/json' },
//   })
//     .then(rooms => rooms)
//     .catch(err => console.log('err: ', err))
// }

// const createRoom = (name) => {
//   return axios.post(url + 'rooms' , {
//     headers: { 'Content-Type': 'application/json' },
//     name
//   })
//     .then(rooms => rooms)
//     .catch(err => console.log('err: ', err))
// }

export default {
  createAndLoginUser,
  // createRoom,
  deleteUser,
  getUsers,
  // getRooms,
  makeUser
}