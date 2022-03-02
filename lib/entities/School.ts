import mongoose from "mongoose";
const SchoolSchema = new mongoose.Schema({
  name: String,
  coord: [Number],
  rooms: [String],
  zip: Number,
  brwf: Boolean,
});

let School: mongoose.Model<any, {}, {}, {}>;
try {
  School = mongoose.model("schools", SchoolSchema);
} catch (e) {
  School = mongoose.model("schools");
}
export { School };
