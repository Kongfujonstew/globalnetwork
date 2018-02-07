import React from 'react'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import UserChip from './UserChip'

class Rooms extends React.Component {

  preventDefault(e) {
    e.preventDefault()
  }

  handleDrop(e) {
    const data = e.dataTransfer;
    e.preventDefault()
    console.log('d: ', data)
  }


  render () {
  const { rooms, deleteUser } = this.props
    return (
      <div>
        <Typography variant="display3" component="h2">
          Rooms
        </Typography>
        { rooms.map(room => {
          const users = room.users || []
          return (
            <Paper style={{backgroundColor: 'lightblue', marginTop: '15px'}} key={room.id}>
              <Card
                onDragOver={this.preventDefault}
                onDrop={this.handleDrop}
              >
                <CardContent>
                  <Typography variant="headline" component="h2">
                    {room.room}
                  </Typography>
                  <Typography component="p">
                    This is probably the best room in the platform.  But you'll never
                    know until you see for yourself.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Join
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
                <Typography component="p">
                  Members:
                </Typography>
                { users.map(user => <UserChip key={user.id} deleteUser={deleteUser} user={user} />) }
              </Card>
            </Paper>
          )
        })
      }
      </div>
    );
  }
}
export default Rooms