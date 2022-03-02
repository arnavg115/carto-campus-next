import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type Query {
    hello: String
    search(id: String!, query: String!): [Room!]!
    getCoords(id: String!, query: String!): Room!
    getSchool(id: String!): School!
    getSchools: [School!]!
    getSchoolByName(name: String!, zip: Int!): School!
    getClosestBR(coord: [Float!]!, id: String!, type: String!): BRWF!
  }
  type School {
    _id: String!
    name: String!
    coord: [Float!]!
    rooms: [String!]!
    zip: Int!
    brwf: Boolean!
  }
  type Room {
    _id: String!
    name: String!
    school: String!
    coord: [Float!]!
    building: String!
    rnum: String!
  }
  type BRWF {
    _id: String!
    type: String!
    school: String!
    coord: [Float!]!
  }
`;

export { typeDefs };
