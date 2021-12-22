import { NextApiHandler } from "next";
import mongoose from "mongoose";
import { utils } from "../../lib/barrel";
import initAuth from "../../lib/initFirebase";
import { verifyIdToken } from "next-firebase-auth";

mongoose.connect(process.env.MONGO!);
initAuth();

const handler: NextApiHandler = async (req, res) => {
  const { id } = req.query as { id: string };
  if (!id) {
    return res.status(400).json({ error: "Bad Request" });
  }
  const dt = await utils.getSchoolData(id);
  return res.status(200).json({
    data: dt.slice(0, 10),
  });
};

export default handler;
