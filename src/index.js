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
      rooms: [{id:1, room:'Fun'}, {id:2, room:'Sports'}, {id:3, room:'Comedy'}, {id:4, room:'Travel'}]
    }
  }

  componentDidMount() {
    asyncActions.getUsers().then(users => this.setState({users: users.data}))
    // asyncActions.getRooms().then(rooms => this.setState({rooms: rooms.data}))
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
    asyncActions.deleteUser(id)
      .then(users => this.parseUsers(users.data))
      .catch(err => console.log('error: ', err))
  }

  createRoom(name) {
    console.log('createing room: ', name)
    const rooms = this.state.rooms
    rooms.push({id:Math.floor(Math.random()*1000), room:name})
    this.setState({rooms})
  }

  addUserToRoom(userId, roomName) {

  }

  deleteUserFromRoom(userId, roomId) {

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
                deleteUser={this.deleteUser.bind(this)}
                users={this.state.users}
              />
            </Grid>
          </Grid>
          <NewUser title={'Create a new group.'} buttonText={'Create group'} createUser={this.createRoom.bind(this)}/>
          <Grid container>
            <Grid item sm={10}>
              <Rooms 
                users={this.state.users}
                rooms={this.state.rooms}
                deleteUser={this.deleteUser.bind(this)}
              />
            </Grid>
          </Grid>
        </main>
      </MuiThemeProvider>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('main'));