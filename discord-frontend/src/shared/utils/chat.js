import store from '../../store/store';
import { setMessage } from '../../store/actions/chatActions';

export const updateDirectChatHistoryIfActive = (data) => {
  const { participants, messages } = data;

  // find id of user from token and id from active conversation
  const receiverId = store.getState().chat.chosenChatDetails
    ? store.getState().chat.chosenChatDetails.id
    : null;
  const userId = store.getState().auth.userDetails._id;

  if (receiverId && userId) {
    const usersInConversation = [receiverId, userId];
    updateChatHistoryIfSameConversationActive({
      participants,
      usersInConversation,
      messages,
    });
  }
};

export const updateChatHistoryIfSameConversationActive = ({
  participants,
  usersInConversation,
  messages,
}) => {
  const result = participants.every(function(participantId) {
    return usersInConversation.includes(participantId);
  });

  if (result) {
    store.dispatch(setMessage(messages));
  }
};
