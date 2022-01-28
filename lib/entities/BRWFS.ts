import mongoose from "mongoose";

const brwfSchema = new mongoose.Model({
  school: String,
  coord: [Number],
  type: String,
});

let BRWF: mongoose.Model<any, {}, {}, {}>;

try {
  BRWF = mongoose.model("br-wfs", brwfSchema);
} catch (e) {
  BRWF = mongoose.model("br-wfs");
}

interface BRWFTYPE {
  school: string;
  coord: number[];
  type: string;
}

// @ts-ignore
export { BRWF, BRWFTYPE };
