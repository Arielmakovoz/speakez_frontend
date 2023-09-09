import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { message } = req.body;

  if (message === 'hi') {
    res.status(200).json({ message: 'Just got it' });
  } else {
    res.status(200).json({ message: 'Hello from Next.js!' });
  }
}