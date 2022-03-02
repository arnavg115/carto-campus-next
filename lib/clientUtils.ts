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

const brwfQuery = gql`
  query Query($coord: [Float!]!, $id: String!, $type: String!) {
    getClosestBR(coord: $coord, id: $id, type: $type) {
      _id
      coord
      type
      school
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

async function getBrWf(e: GeolocationPosition, id: string, type: string) {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: brwfQuery,
    variables: {
      coord: [e.coords.longitude, e.coords.latitude],
      id,
      type,
    },
  });
  return data;
}

function midpoint(or: number[], dest: number[]): [number, number] {
  const x = (or[0] + dest[0]) / 2;
  const y = (or[1] + dest[1]) / 2;
  return [x, y];
}
function meterstoft(m: number) {
  return m * 3.28084;
}

export { search, get, getRoute, midpoint, meterstoft, getBrWf };
