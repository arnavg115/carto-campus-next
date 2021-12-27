export interface school {
  zip: string;
  _id: string;
  name: string;
  coord: number[];
  rooms: string[];
}

export interface RoomType {
  name: string;
  school: string;
  coord: number[];
  building: string;
  rnum: string;
}

export interface Prefs {
  units: string;
  school: string;
}
