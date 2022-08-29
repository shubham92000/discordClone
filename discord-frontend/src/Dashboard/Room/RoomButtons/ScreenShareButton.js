import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';

const ScreenShareButton = () => {
  const [isScreenSharingActive, SetIsScreenSharingActive] = useState(false);

  const handleScreenShareToggle = () => {
    SetIsScreenSharingActive(!isScreenSharingActive);
  };

  return (
    <IconButton onClick={handleScreenShareToggle} style={{ color: 'white' }}>
      {isScreenSharingActive ? <StopScreenShareIcon /> : <ScreenShareIcon />}
    </IconButton>
  );
};

export default ScreenShareButton;
