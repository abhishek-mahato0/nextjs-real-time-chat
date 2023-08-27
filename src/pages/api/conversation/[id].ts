import { ShowError } from '@/lib/ApiError';
import Conversation from '@/models/chatModel';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function hanlder(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query;
    if (!id) {
      return ShowError(res, 400, 'Something Error Happened');
    }
    const conv = await Conversation.findById(id)
      .populate('admin members')
      .populate({
        path: 'messages.sender',
        model: 'User',
      });
    return res.status(200).json(conv);
  } catch (error: any) {
    return ShowError(res, 400, error.message);
  }
}
