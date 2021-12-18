import { ApolloServer } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { School, typeDefs, utils } from "../../lib/barrel";

mongoose.connect(process.env.MONGO!);

const resolvers = {
  Query: {
    hello() {
      return "Hello world!";
    },
    async search(parent: any, { id, query }: { id: string; query: string }) {
      const data = await utils.getSchoolData(id);
      const result = await utils.search(query, data);
      return result;
    },
    async getCoords(parent: any, { id, query }: { id: string; query: string }) {
      const data = await utils.getSchoolData(id);
      const rs = utils.get(query, data);
      console.log(rs);
      if (!rs) {
        throw new Error("Not Found");
      }
      return rs;
    },
    async getSchool(parent: any, { id }: { id: string }) {
      const data = await School.findById(id);
      return data;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers: resolvers });
const startServer = server.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method == "OPTIONS") {
    res.setHeader(
      "Access-Control-Allow-Methods",
      "PUT, POST, PATCH, DELETE, GET"
    );
    return res.status(200).json({});
  }
  await startServer;
  await server.createHandler({
    path: "/api/gql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};