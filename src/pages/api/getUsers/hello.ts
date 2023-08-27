import { ShowError } from '@/lib/ApiError';
import User from '@/models/userModel';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.query;
  if (!name) {
    return ShowError(res, 400, 'Invalid name');
  }

  const user = await User.find({ name: { $regex: name, $options: 'i' } });
  if (!user) {
    return res.status(200).json({ messsage: 'No user Found' });
  }
  return res.status(200).json(user);
}
