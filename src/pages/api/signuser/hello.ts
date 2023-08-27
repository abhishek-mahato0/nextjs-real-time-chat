// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from '@/lib/db';
import { signToken } from '@/lib/userAuth';
import User from '@/models/userModel';
import type { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();
    const { name, email, image } = req.body;
    if (!name || !email || !image) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const exists = await User.findOne({ email });
    if (exists) {
      const token = signToken(exists);
      if (token) {
        const cookies = new Cookies(req, res);
        cookies.set('jwttoken', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        });
        res.status(200).json(exists);
      } else {
        res.status(400).json({ message: 'Error Occured' });
      }
    } else {
      const user = new User({
        name,
        email,
        image,
      });
      if (user) {
        const token = signToken(user);
        if (token) {
          await user.save();
          const cookies = new Cookies(req, res);
          cookies.set('jwttoken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
          });
          res.status(200).json(user);
        } else {
          res.status(400).json({ message: 'Error Occured' });
        }
      }
    }
  } catch (error: any) {
    res.status(400).json(error.message);
  }
}
