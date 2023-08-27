import dbConnect from '@/lib/db';
import { verifyToken } from '@/lib/userAuth';
import Conversation from '@/models/chatModel';
import User from '@/models/userModel';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const curuser = await verifyToken(req, res);
    if (!curuser?._id) {
      return res.status(400).json({ message: 'Login again' });
    }
    const { _id } = curuser;
    const { id } = req.query;
    const currUser = await User.findById(_id);
    if (!currUser) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: 'Invalid user' });
    }
    let exists = false;
    for (let i = 0; i < currUser.friends.length; i++) {
      if (currUser.friends[i].toString() == user._id.toString()) {
        exists = true;
        break;
      }
    }
    if (exists) {
      return res.status(200).json({ message: 'Friend Already Added' });
    }
    currUser.friends.push(user._id);
    user.friends.push(currUser._id);
    const conv = new Conversation({
      isGroup: false,
      members: [user._id, currUser._id],
    });
    await conv.save();
    user.chat.push(conv._id);
    currUser.chat.push(conv._id);
    await user.save();
    await currUser.save();
    const conversation = await Conversation.findById(conv._id).populate({
      path: 'members',
      model: 'User',
    });
    return res.status(200).json({ user: user, conversation: conversation });
  } catch (error: any) {
    console.log(error.message);
  }
}
