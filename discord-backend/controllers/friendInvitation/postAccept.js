const FriendInvitation = require('../../models/friendInvitation');
const User = require('../../models/user');
const friendsUpdates = require('../../socketHandlers/updates/friends');

const postAccept = async (req, res) => {
  try {
    const { id } = req.body;
    const invitation = await FriendInvitation.findById(id);

    if (!invitation) {
      return res.status(401).status('Error occured. Please try again');
    }

    const { senderId, receiverId } = invitation;

    // add friends to both users
    const senderUser = await User.findById(senderId);
    senderUser.friends = [...senderUser.friends, receiverId];

    const receiverUser = await User.findById(receiverId);
    receiverUser.friends = [...receiverUser.friends, senderId];

    await senderUser.save();
    await receiverUser.save();

    // delete invitation from collection
    await FriendInvitation.findByIdAndDelete(id);

    // update list of friendsPendingInvitations by socket for receiveruser
    friendsUpdates.updateFriendsPendingInvitations(receiverId.toString());

    // update list of friends if users are online by sockets

    return res.status(200).send('Invitation successfully accepted');
  } catch (err) {
    console.log(err);
    return res.status(500).send('Something went wrong. Please try again later');
  }
};

module.exports = postAccept;
