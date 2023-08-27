import { ShowError } from '@/lib/ApiError';
import { verifyToken } from '@/lib/userAuth';
import User from '@/models/userModel';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const curUser = await verifyToken(req, res);
  if (!curUser?._id) {
    return ShowError(res, 400, 'Please LogIn');
  }
  const user = await User.findById(curUser._id);
  if (!user) {
    return ShowError(res, 400, 'Invalid User id. Please Login again');
  }
  let flist: any[] = [];
  for (let i = 0; i < user.friends.length; i++) {
    const fr = await User.findById(user.friends[i]).populate('friends');
    fr.friends.map((ele: any) => {
      if (ele._id.toString() !== user._id.toString()) {
        flist.push(ele);
      }
    });
  }
  const rec = flist.filter((ele) => !user.friends.includes(ele._id));
  const users = await User.find().limit(5);
  if (rec.length < 1) {
    return res.status(200).json(users);
  }
  res.status(200).json(rec);
}
