import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip'
import FaceIcon from 'material-ui-icons/Face';

const Users = (props) => {
  const { users, deleteUser } = props;
  return (
    <div>
      <Paper style={{marginTop:'18px'}} elevation={4}>
        <Typography variant="headline" component="h3">
          Users
        </Typography>
        <Typography component="p">
          Click on someone to delete them.
        </Typography>
        {
          users.map(user => {
            return (
              <Chip
                avatar={
                  <Avatar>
                    <FaceIcon />
                  </Avatar>
                }
                key={user.id}
                label={user.name}
                onClick={() => {}}
                onDelete={() => deleteUser(user.id)}
              />
            )
          })
        }
      </Paper>
    </div>
  );
}

export default Users