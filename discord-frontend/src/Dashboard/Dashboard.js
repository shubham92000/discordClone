import React, { useEffect } from 'react';
import { styled } from '@mui/system';
import Sidebar from './Sidebar/Sidebar';
import FriendsSidebar from './FriendsSidebar/FriendsSidebar';
import Messenger from './Messenger/Messenger';
import AppBar from './AppBar/AppBar';
import { logout } from '../shared/utils/auth';
import { connect } from 'react-redux';
import { getAction } from '../store/actions/authActions';
import { connectWithSocketServer } from '../realtimeCommunication/socketConnection';

const Wrapper = styled('div')({
  width: '100%',
  height: '100vh',
  display: 'flex',
});

const Dashboard = ({ auth, setUserDetails }) => {
  useEffect(() => {
    const userDetails = localStorage.getItem('user');
    if (!userDetails) {
      logout();
    } else {
      setUserDetails(JSON.parse(userDetails));
      connectWithSocketServer(JSON.parse(userDetails));
    }
  }, []);

  // useEffect(() => {
  //   if (auth === null || auth.userDetails === null) {
  //     logout();
  //   } else {
  //     connectWithSocketServer(JSON.parse(userDetails));
  //   }
  // }, [auth]);

  return (
    <Wrapper>
      <Sidebar />
      <FriendsSidebar />
      <Messenger />
      <AppBar />
    </Wrapper>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getAction(dispatch),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Dashboard);
