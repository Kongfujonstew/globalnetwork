import React from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip'
import FaceIcon from 'material-ui-icons/Face';

const UserChip = (props) => {
  const { user, deleteUser } = props;
  return (
    <Chip
      avatar={
        <Avatar>
          <FaceIcon />
        </Avatar>
      }
      draggable
      label={user.name}
      onClick={() => {}}
      onDelete={() => deleteUser(user.id)}
    />
  )
}

export default UserChip