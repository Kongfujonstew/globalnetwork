import React from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip'
import FaceIcon from 'material-ui-icons/Face';

const UserChip = (props) => {
  const { user, userDragStart, deleteUser, roomId, currentUserId } = props;
  return (
    <Chip
      avatar={
        <Avatar>
          <FaceIcon />
        </Avatar>
      }
      draggable
      onDragStart={() => userDragStart(user.id)}
      label={user.id === currentUserId ? 'ME' : user.name}
      onClick={() => {}}
      onDelete={() => deleteUser(user.id, roomId)}
    />
  )
}

export default UserChip