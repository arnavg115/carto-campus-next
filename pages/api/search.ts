import { NextApiHandler } from "next";
import mongoose from "mongoose";
import { utils } from "../../lib/barrel";

mongoose.connect(process.env.MONGO!);

const handler: NextApiHandler = async (req, res) => {
  const { id, query } = req.query as { id: string; query: string };
  if (!id || !query) {
    return res.status(400).json({ error: "Bad Request" });
  }
  const dt = await utils.getSchoolData(id);
  const result = utils.search(query, dt);
  return res.status(200).json({
    data: result,
  });
};

export default handler;
