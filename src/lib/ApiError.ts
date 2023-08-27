import { NextApiResponse } from 'next';

export const ShowError = (
  res: NextApiResponse,
  stat: number,
  message: string
) => {
  return res.status(stat).json({ message: message });
};
