import mongoose from "mongoose";
const RoomSchema = new mongoose.Schema({
  name: String,
  school: String,
  coord: [Number],
  building: String,
  rnum: String,
});

let Room: mongoose.Model<any, {}, {}, {}>;

try {
  Room = mongoose.model("rooms", RoomSchema);
} catch (e) {
  Room = mongoose.model("rooms");
}

interface RoomType {
  name: string;
  school: string;
  coord: number[];
  building: string;
  rnum: string;
}

// @ts-ignore
export { Room, RoomType };
