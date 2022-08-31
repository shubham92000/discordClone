import store from '../store/store';
import { setLocalStream } from '../store/actions/roomActions';

const onlyAudioConstrains = {
  audio: true,
  video: false,
};

const defaultConstrains = {
  video: true,
  audio: true,
};

export const getLocalStreamPreview = (onlyAudio = false, callbackFunc) => {
  const constrains = onlyAudio ? onlyAudioConstrains : defaultConstrains;
  navigator.mediaDevices
    .getUserMedia(constrains)
    .then((stream) => {
      store.dispatch(setLocalStream(stream));
      callbackFunc();
    })
    .catch((err) => {
      console.log(err);
      console.log('cannot get access to localStream');
    });
};
