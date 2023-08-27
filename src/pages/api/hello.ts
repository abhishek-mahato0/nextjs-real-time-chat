// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '@/lib/userAuth';
import { getToken } from 'next-auth/jwt';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // If you don't have the NEXTAUTH_SECRET environment variable set,
  // you will have to pass your secret as `secret` to `getToken`
  const session = await getServerSession(req, res, authOptions);
  res.send({ ...session });
}

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     await dbConnect();
//     const pay = verifyToken(req, res);
//     if (!pay) {
//       return res.status(400).json({ message: 'Login First' });
//     }
//     res.status(200).json(pay._doc);
//   } catch (error: any) {
//     res.status(400).json({ message: error.message });
//   }
// }
