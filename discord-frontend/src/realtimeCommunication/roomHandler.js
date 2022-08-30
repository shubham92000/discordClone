import {
  setOpenRoom,
  setRoomDetails,
  setActiveRooms,
} from '../store/actions/roomActions';
import * as socketConnection from './socketConnection';
import store from '../store/store';
import { openAlertMessage } from '../store/actions/alertActions';

export const createNewRoom = () => {
  store.dispatch(setOpenRoom(true, true));
  socketConnection.createNewRoom();
};

export const newRoomCreated = (data) => {
  const { roomDetails } = data;
  store.dispatch(setRoomDetails(roomDetails));
};

export const updateActiveRooms = (data) => {
  const { activeRooms } = data;
  console.log(activeRooms);
  const friends = store.getState().friends.friends;
  const rooms = [];
  activeRooms.forEach((room) => {
    friends.forEach((f) => {
      if (f.id === room.roomCreator.userId) {
        rooms.push({ ...room, creatorUsername: f.username });
      }
    });
  });

  store.dispatch(setActiveRooms(rooms));
};

export const joinRoom = (roomId) => {
  store.dispatch(setRoomDetails({ roomId }));
  store.dispatch(setOpenRoom(false, true));
  socketConnection.joinRoom({ roomId });
};
