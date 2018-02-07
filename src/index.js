import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, Redirect, Router } from 'react-router-dom'
import { MuiThemeProvider } from 'material-ui/styles'
import asyncActions from './axios'
import { Chip } from 'material-ui/Chip'
import theme from './theme'
import Grid    from 'material-ui/Grid'
import AppBar  from './components/AppBar'
import Users from './components/Users'
import NewUser from './components/NewUser'

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      users: [],
      rooms: []
    }
  }

  componentDidMount() {
    asyncActions.getUsers().then(users => this.setState({users: users.data}))
    asyncActions.getRooms().then(rooms => this.setState({rooms: rooms.data}))
  }

  parseUsers(usersArray) {
    const others = usersArray.filter(user => !user.you)
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

  logout() {
    this.setState({user:{}})
  }

  render() {
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
                <NewUser title={'Welcome! Now you can create more users!!'} buttonText={'Make someone else'} createUser={this.makeUser.bind(this)}/>
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
        </main>
      </MuiThemeProvider>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('main'));