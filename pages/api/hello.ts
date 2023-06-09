// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectToDatabase } from '@/config/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const client = await connectToDatabase();
  const db = client.db("movie_trailer");
  const allPosts = await db.collection("movies").find().toArray();
  res.status(200).json({ data: allPosts })

}
