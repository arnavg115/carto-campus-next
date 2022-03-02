import mongoose from "mongoose";

const brwfSchema = new mongoose.Schema({
  type: String,
  school: String,
  coord: [Number],
});

let BRWF: mongoose.Model<any, {}, {}, {}>;

try {
  BRWF = mongoose.model("br-wfs", brwfSchema);
} catch (e) {
  BRWF = mongoose.model("br-wfs");
}

export interface BRWFTYPE {
  school: string;
  coord: number[];
  type: string;
}

// @ts-ignore
export { BRWF };
