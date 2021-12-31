import React, { FC } from "react";

interface DividerProps {
  height?: string;
}

const Divider: FC<DividerProps> = ({ height }) => {
  return (
    <div
      style={{
        height: height || "1px",
        width: "100%",
        backgroundColor: "#262626",
        marginTop: "5px",
        marginBottom: "5px",
      }}
    />
  );
};

export default Divider;
