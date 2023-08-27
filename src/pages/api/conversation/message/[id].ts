import { ShowError } from '@/lib/ApiError';
import { verifyToken } from '@/lib/userAuth';
import Conversation from '@/models/chatModel';
import User from '@/models/userModel';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query;
    const curUser = await verifyToken(req, res);
    if (!curUser?._id) {
      return ShowError(res, 400, 'Login Again');
    }
    const { sender, content } = req.body;
    if (!sender || !content) {
      return ShowError(res, 400, 'Missing Fields');
    }
    const user = await User.findById(sender);
    if (!user?._id) {
      return ShowError(res, 400, 'Not authorized. Please login again');
    }
    const conv = await Conversation.findById(id);
    if (!conv?._id) {
      return ShowError(res, 400, 'Invalid Conversation Id');
    }
    const message = {
      sender,
      content,
    };
    conv.messages.push(message);
    await conv.save();
    const conversation = await Conversation.findById(conv._id).populate({
      path: 'messages',
      populate: {
        path: 'sender',
      },
    });
    return res.status(201).json(conversation);
  } catch (error: any) {
    ShowError(res, 400, error.message);
  }
}
