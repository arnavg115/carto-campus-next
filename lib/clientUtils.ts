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

const addDot = (
  mapinpt: mapboxgl.Map,
  coord: number[],
  color: string,
  id: string
) => {
  mapinpt.addLayer({
    id,
    type: "circle",
    source: {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Point",
              coordinates: coord,
            },
          },
        ],
      },
    },
    paint: {
      "circle-radius": 10,
      "circle-color": color,
    },
  });
};
const addLine = (mapinpt: mapboxgl.Map, geojson: any) => {
  mapinpt.addLayer({
    id: "route",
    type: "line",
    source: {
      type: "geojson",
      data: geojson,
    },
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#3887be",
      "line-width": 5,
      "line-opacity": 0.75,
    },
  });
};

async function getRoute(or: number[], dest: number[]) {
  const res = await fetch(
    `https://api.mapbox.com/directions/v5/mapbox/walking/${or[0]},${or[1]};${dest[0]},${dest[1]}?steps=true&geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX}`
  );
  const data = await res.json();
  console.log(or);
  console.log(dest);
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
  return data.getClosestBR;
}

function midpoint(or: number[], dest: number[]): [number, number] {
  const x = (or[0] + dest[0]) / 2;
  const y = (or[1] + dest[1]) / 2;
  return [x, y];
}
function meterstoft(m: number) {
  return m * 3.28084;
}

export {
  search,
  get,
  getRoute,
  midpoint,
  meterstoft,
  getBrWf,
  addLine,
  addDot,
};
