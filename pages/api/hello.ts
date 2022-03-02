// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
// import { BRWF, School } from "../../lib/barrel";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // console.log(BRWF);
  res.status(200).json({ name: "John Doe" });
}
