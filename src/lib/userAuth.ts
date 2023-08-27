import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export function signToken(payload: UserPayload) {
  try {
    return jwt.sign({ ...payload }, JWT_SECRET_KEY ? JWT_SECRET_KEY : '', {
      expiresIn: 200,
    });
  } catch (error) {
    return null;
  }
}

export function verifyToken(req: NextApiRequest, res: NextApiResponse) {
  try {
    const cookies = new Cookies(req, res);
    const token = cookies.get('jwttoken') as string;
    if (!token) {
      return res.status(400).json({ message: 'Login Again' });
    } else {
      const decoded: any = jwt.verify(
        token,
        JWT_SECRET_KEY ? JWT_SECRET_KEY : ''
      );
      return decoded._doc;
    }
  } catch (error) {
    return null;
  }
}
