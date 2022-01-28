import { extract, FuzzballExtractOptions, partial_ratio } from "fuzzball";

import { Room, RoomType, School } from "./barrel";

const options: FuzzballExtractOptions = {
  scorer: partial_ratio,
  processor: (x) => x.name,
  limit: 10,
  cutoff: 50,
  sortBySimilarity: true,
};

const search = (query: string, data: RoomType[]) => {
  const res = extract(query, data, options);
  return res.map((x) => x[0]) as RoomType[];
};

const minW = (x: number, y: number) => {
  return Math.min(x, y) === x;
};

const get = (query: string, data: RoomType[]) => {
  for (let i = 0; i < data.length; i++) {
    const e = data[i];
    if (e.name.toLowerCase() === query.toLowerCase()) {
      return e;
    }
  }
  const result = search(query, data);
  return result[0];
};

const findClosest = (coords: number[], data: RoomType[]) => {
  var index = 0;
  var dist = 0;
  for (let i = 0; i < data.length; i++) {
    const e = data[i];
    const currentDist = Math.sqrt(
      Math.pow(e.coord[0] - coords[0], 2) - Math.pow(e.coord[1] - coords[1], 2)
    );
    if (minW(currentDist, dist)) {
      dist = currentDist;
      index = i;
    }
  }
  return data[index];
};

const getSchoolData = async (id: string) => {
  const res = await School.findOne({ _id: id });
  if (!res) {
    throw new Error("Database Error");
  }
  const data = await Room.find({ school: res.id });
  return data;
};

// const getSchoolBR = async (id: string, coord: number[]) => {
//   const res = await School.findOne({ _id: id });
//   if (!res) {
//     throw new Error("Not Found");
//   }
//   const brs = (await BRWF.find({ school: res.id })) as BRWFTYPE[];
//   let closest: BRWFTYPE;
//   for (let i = 0; i++; i < brs.length) {}
// };

export { search, get, getSchoolData, findClosest };
