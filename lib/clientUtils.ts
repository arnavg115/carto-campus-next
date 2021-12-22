import { gql } from "@apollo/client";
import { initializeApollo } from "./apollo";

const searchQuery = gql`
  query Query($id: String!, $query: String!) {
    search(id: $id, query: $query) {
      name
    }
  }
`;

const getCoordQuery = gql`
  query Query($id: String!, $query: String!) {
    getCoords(id: $id, query: $query) {
      name
      coord
    }
  }
`;
async function search(id: string, query: string) {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: searchQuery,
    variables: {
      id,
      query,
    },
  });
  return data.search;
}

async function get(id: string, query: string) {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: getCoordQuery,
    variables: {
      id,
      query,
    },
  });
  return data.getCoords;
}

async function getRoute(or: number[], dest: number[]) {
  const res = await fetch(
    `https://api.mapbox.com/directions/v5/mapbox/cycling/${or[0]},${or[1]};${dest[0]},${dest[1]}?steps=true&geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX}`
  );
  const data = await res.json();
  return data.routes[0];
}
function midpoint(or: number[], dest: number[]): [number, number] {
  const x = (or[0] + dest[0]) / 2;
  const y = (or[1] + dest[1]) / 2;
  return [x, y];
}

export { search, get, getRoute, midpoint };
