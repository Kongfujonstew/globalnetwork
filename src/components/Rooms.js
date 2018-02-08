import React from 'react'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import UserChip from './UserChip'
import Grid from 'material-ui/Grid'

class Rooms extends React.Component {

  preventDefault(e) {
    e.preventDefault()
  }

  handleDrop(roomName) {
    this.props.addUserToRoom(roomName)
  }


  render () {
  const { rooms, addYouToRoom, deleteUserFromRoom, deleteRoom, deleteUser, userDragStart, currentUserId } = this.props
    return (
      <div>
        <Typography variant="display1" component="h2">
          Rooms
        </Typography>
        <Grid container>
        { rooms.map(room => {
          const users = room.users || []
          return (
            <Grid item style={{width: '50%'}} key={room.id}>
              <Paper style={{backgroundColor: 'lightblue', marginTop: '15px', padding: '4px'}}>
                <Card
                  style={{padding: '8px', minHeight: '240px'}}
                  onDragOver={this.preventDefault}
                  onDrop={() => this.handleDrop(room.id)}
                >
                  <CardContent>
                    <Typography variant="headline" component="h2">
                      {room.room}
                    </Typography>
                    <Typography component="p">
                      This is probably the best room.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => addYouToRoom(room.id)}
                    >
                      Join
                    </Button>
                    <Button size="small" color="primary">
                      Learn More
                    </Button>
                    <Button 
                      size="small"
                      color="primary"
                      onClick={() => deleteRoom(room.id)}
                    >
                      Delete this room
                    </Button>
                  </CardActions>
                  <Typography component="p">
                    Members:
                  </Typography>
                  { users.map(user => <UserChip key={user.id} currentUserId={currentUserId} roomId={room.id} userDragStart={userDragStart} deleteUser={deleteUserFromRoom} user={user} />) }
                </Card>
              </Paper>
            </Grid>
          )
        })
      }
        </Grid>
      </div>
    );
  }
}
export default Rooms