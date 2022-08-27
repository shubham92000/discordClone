const User = require('../../models/user');
const FriendInvitation = require('../../models/friendInvitation');

const postInvite = async (req, res) => {
  const { targetMailAddress } = req.body;

  const { userId, mail } = req.user;

  if (mail.toLowerCase() === targetMailAddress.toLowerCase()) {
    return res
      .status(409)
      .send('Sorry, you cannot become friend with yourself');
  }

  const targetUser = await User.findOne({
    mail: targetMailAddress.toLowerCase(),
  });

  if (!targetUser) {
    return res
      .status(404)
      .send(
        `Friend of ${targetMailAddress} has not been found. please check mail address`
      );
  }

  const invitationAlreadyReceived = await FriendInvitation.findOne({
    senderId: userId,
    receiverId: targetUser._id,
  });

  if (invitationAlreadyReceived) {
    return res.status(409).send('Invitation has already been sent');
  }

  const usersAlreadyFriend = targetUser.friends.find(
    (friendId) => friendId.toString() === userId.toString()
  );

  if (usersAlreadyFriend) {
    return res
      .status(409)
      .send('Friend already added. Please check friend list');
  }

  const newInvitation = await FriendInvitation.create({
    senderId: userId,
    receiverId: targetUser._id,
  });

  // if invitation has already been successfully created we would like to update friends invitations

  return res.status(201).send('Invitation has been sent');
};

module.exports = postInvite;
