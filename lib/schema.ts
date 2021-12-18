import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type Query {
    hello: String
    search(id: String!, query: String!): [Room!]!
    getCoords(id: String!, query: String!): Room!
    getSchool(id: String!): School!
  }
  type School {
    _id: String!
    name: String!
    coord: [Float!]!
    rooms: [String!]!
    zip: Int!
  }
  type Room {
    _id: String!
    name: String!
    school: String!
    coord: [Float!]!
    building: String!
    rnum: String!
  }
`;

export { typeDefs };
