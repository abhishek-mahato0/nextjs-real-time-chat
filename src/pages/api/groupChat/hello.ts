import { ShowError } from '@/lib/ApiError';
import Conversation from '@/models/chatModel';
import User from '@/models/userModel';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { members, admin, name } = req.body;
    if (!members || !admin || !name) {
      return ShowError(res, 400, 'Invalid credentials');
    }
    const membersArr = members.split(',');
    if (membersArr.length <= 2) {
      return ShowError(res, 400, 'Please select more than two members');
    }
    const conv = new Conversation({
      admin,
      name,
      members: membersArr,
      isGroup: true,
    });
    if (!conv) {
      return ShowError(res, 400, 'Some error occured');
    }
    const adminUser = await User.findById(admin);
    if (!adminUser) {
      return ShowError(res, 400, 'Invalid UserId');
    }
    for (let i = 0; i < membersArr.length; i++) {
      if (i > 1 && membersArr[i] == membersArr[i - 1]) {
        return ShowError(res, 400, 'Cannot add same members twice');
      }
      const us = await User.findById(membersArr[i]);
      if (!us?._id) {
        return ShowError(res, 400, 'User not found');
      }
      us.chat.push(conv._id);
      await us.save();
    }
    await conv.save();
    const conversation = await Conversation.findById(conv._id).populate({
      path: 'members',
      model: 'User',
    });
    return res.status(201).json(conversation);
  } catch (error: any) {
    ShowError(res, 400, error.message);
  }
}
