/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Check if the request contains a file with the field name "audio"
  if (req.body && req.body.audio instanceof Buffer) {
    // Replace this part with your processing logic for the audio file
    // For now, it simply responds with "Audio file gotten"
    res.status(200).json({ message: 'Audio file gotten' });
  } else {
    res.status(200).json({ message: 'Hello from Next.js!' });
  }
}