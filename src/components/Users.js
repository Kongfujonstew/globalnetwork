import React from 'react'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import UserChip from './UserChip'

const Users = (props) => {
  const { users, userDragStart, deleteUser, currentUserId } = props;
  return (
    <div>
      <Paper style={{marginTop:'18px'}} elevation={4}>
        <Typography variant="headline" component="h3">
          Users
        </Typography>
        <Typography component="p">
          Click on someone to delete them.
        </Typography>
        { users.map(user => <UserChip key={user.id} currentUserId={currentUserId} userDragStart={userDragStart} deleteUser={deleteUser} user={user} />) }
      </Paper>
    </div>
  );
}

export default Users