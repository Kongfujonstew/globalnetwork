import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, Redirect, Router } from 'react-router-dom'
import { MuiThemeProvider } from 'material-ui/styles'
import asyncActions from './axios'
import { Chip } from 'material-ui/Chip'
import theme from './theme'
import Grid    from 'material-ui/Grid'
import AppBar   from './components/AppBar'
import Users    from './components/Users'
import NewUser  from './components/NewUser'
import Rooms    from './components/Rooms'

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      users: [],
      rooms: [{id:1, room:'Fun', users:[]}, {id:2, room:'Sports', users:[]}, {id:3, room:'Comedy', users:[]}, {id:4, room:'Travel', users:[]}],
      draggedUserId: null
    }
  }

  componentDidMount() {
    asyncActions.getUsers().then(users => this.setState({users: users.data}))
  }

  parseUsers(usersArray) {
    const others = usersArray.filter(user => user.id !== this.state.user.id)
    this.setState({users: others})
  }

  createAndLoginUser(name) {
    asyncActions.createAndLoginUser(name)
      .then(users => {
        if (!this.state.user.isAuthenticated) {
          const you = users.data.filter(user => user.you)[0]
          you.isAuthenticated = true
          this.setState({user: you})
        }
        this.parseUsers(users.data)
      })
      .catch(err => console.log('error: ', err))
  }

  makeUser(name) {
    asyncActions.makeUser(name)
      .then(users => this.parseUsers(users.data))
      .catch(err => console.log('error: ', err))
  }

  deleteUser(id) {
    const { rooms } = this.state
    asyncActions.deleteUser(id)
      .then(users => this.parseUsers(users.data))
      .catch(err => console.log('error: ', err))
    const newRooms = rooms.map(room => {
      room.users = room.users.filter(user => user.id !== id)
      return room
    })
    this.setState({rooms:newRooms})
  }

  createRoom(name) {
    const rooms = this.state.rooms
    rooms.push({id:Math.floor(Math.random()*1000), room:name, users:[]})
    this.setState({rooms})
  }

  deleteRoom(id) {
    let rooms = this.state.rooms
    rooms = rooms.filter(room => room.id !== id || room.users.length > 0)
    this.setState({rooms})
  }

  userDragStart(id) {
    this.setState({draggedUserId: id})
  }

  addUserToRoom(id) {
    const { rooms, users, draggedUserId } = this.state
    const thisUser = users.filter(user => user.id === draggedUserId)[0]
    const newRooms = rooms.map(room => {
      let userExists = false
      room.users.map(user => {if (user.id === thisUser.id) userExists = true})
      if (room.id === id && !userExists) room.users.push(thisUser)
      return room
    })
    this.setState({rooms:newRooms})
  }

  addYouToRoom(id) {
    console.log('id: ', id)
    if (!this.state.user.isAuthenticated) {
      alert('Please log in to join room!')
    } else {
      const { rooms, users, draggedUserId } = this.state
      const thisUser = this.state.user
      const newRooms = rooms.map(room => {
        let userExists = false
        console.log('thisUser: ', thisUser)
        room.users.map(user => {if (user.id === thisUser.id) userExists = true})
        if (room.id === id && !userExists) room.users.push(thisUser)
        return room
      })
      console.log('newRooms: ', newRooms)
      this.setState({rooms:newRooms})
    }
  }

  deleteUserFromRoom(userId, roomId) {
    const rooms = this.state.rooms
    const newRooms = rooms.map(room => {
      if (room.id === roomId) {
        room.users = room.users.filter(user => user.id !== userId)
        return room
      } else { 
        return room
      }
    })
    this.setState({rooms:newRooms})
  }

  logout() {
    location.reload()
  }

  render() {
    console.log('user: ', this.state.user)
    return (
      <MuiThemeProvider theme={theme}>
        <main>
          <AppBar
            user={this.state.user}
            logout={this.logout.bind(this)}
          />
          <Grid container>
            { this.state.user.isAuthenticated ?
              <Grid item sm={10}>
                <NewUser title={'Welcome ' + this.state.user.name + '! Now you can create more users!!'} buttonText={'Make someone else'} createUser={this.makeUser.bind(this)}/>
              </Grid> :
              <Grid item sm={10}>
                <NewUser title={'Enter your name to sign up.'} buttonText={'Join Now'} createUser={this.createAndLoginUser.bind(this)}/>
              </Grid>
            }
          </Grid>
          <Grid container>
            <Grid item sm={10}>
              <Users
                users={this.state.users}
                userDragStart={this.userDragStart.bind(this)}
                deleteUser={this.deleteUser.bind(this)}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item sm={10}>
              <Rooms 
                users={this.state.users}
                rooms={this.state.rooms}
                currentUserId={this.state.user.id}
                addUserToRoom={this.addUserToRoom.bind(this)}
                addYouToRoom={this.addYouToRoom.bind(this)}
                deleteRoom={this.deleteRoom.bind(this)}
                deleteUserFromRoom={this.deleteUserFromRoom.bind(this)}
                deleteUser={this.deleteUser.bind(this)}
                userDragStart={this.userDragStart.bind(this)}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item sm={10}>          
              <NewUser title={'Create a new room.'} buttonText={'Create group'} createUser={this.createRoom.bind(this)}/>
            </Grid>
          </Grid>
        </main>
      </MuiThemeProvider>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('main'));