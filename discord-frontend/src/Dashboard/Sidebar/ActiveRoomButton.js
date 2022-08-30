import React from 'react';
import { Button, Tooltip } from '@mui/material';
import Avatar from '../../shared/components/Avatar';
import * as roomHandler from '../../realtimeCommunication/roomHandler';

const ActiveRoomButton = ({
  roomId,
  creatorUsername,
  amountOfParticipants,
  isUserInRoom,
}) => {
  const handleJoinActiveRooms = () => {
    if (amountOfParticipants < 4) {
      // join room
      roomHandler.joinRoom(roomId);
    }
  };

  const activeRoomButtonDisabled = amountOfParticipants > 3;
  const roomTitle = `Creator: ${creatorUsername}. Connected: ${amountOfParticipants}`;
  return (
    <Tooltip title={roomTitle}>
      <div>
        <Button
          disabled={activeRoomButtonDisabled || isUserInRoom}
          onClick={handleJoinActiveRooms}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '16px',
            margin: 0,
            padding: 0,
            minWidth: 0,
            marginTop: '10px',
            color: 'white',
            backgroundColor: '#5865F2',
          }}
        >
          <Avatar username={creatorUsername} />
        </Button>
      </div>
    </Tooltip>
  );
};

export default ActiveRoomButton;
