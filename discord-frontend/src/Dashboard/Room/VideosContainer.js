import React from 'react';
import { styled } from '@mui/system';
import { connect } from 'react-redux';
import Video from './Video';

const MainContainer = styled('div')({
  height: '85%',
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
});

const VideosContainer = ({ localStream, remoteStreams }) => {
  return (
    <MainContainer>
      <Video stream={localStream} isLocalStream={true} />
      {remoteStreams.map((stream) => (
        <Video stream={stream} isLocalStream={false} key={stream.id} />
      ))}
    </MainContainer>
  );
};

const mapStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

export default connect(mapStateToProps)(VideosContainer);
