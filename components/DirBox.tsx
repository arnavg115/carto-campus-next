import { Button, Collapsible } from "grommet";
import React, { FC } from "react";
import { meterstoft } from "../lib/clientUtils";
import styles from "../styles/Dashboard.module.css";
import { FormDown } from "grommet-icons";

interface DirBoxProps {
  dir: any;
  prefs: any;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DirBox: FC<DirBoxProps> = ({ dir, prefs, open, setOpen }) => {
  return (
    <div className={styles.dirbox}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr  1fr 0.5fr",
          padding: "10px",
          position: "sticky",
          top: "0",
          backgroundColor: "black",
          color: "white",
        }}
      >
        <p style={{}}>
          {Math.floor(dir.duration / 60)} min {Math.floor(dir.duration % 60)} s
        </p>
        <p style={{ margin: "0px" }}>
          <p style={{ margin: "0px" }}>ETA:</p>
          {(() => {
            const e = new Date(Date.now() + dir.duration * 1000);
            // console.log(e);
            const str = e.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            if (str.substring(0, 1) === "0") {
              return str.substring(1);
            }
            return str;
          })()}
        </p>
        <p>
          {prefs !== [] && prefs.units === "imperial"
            ? `${(meterstoft(dir.distance as number) / 5280).toFixed(2)} mi`
            : `${(dir.distance / 1000).toFixed(2)} km`}
        </p>
        <Button
          icon={<FormDown />}
          onClick={() => setOpen(!open)}
          style={{
            transform: !open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "all 0.2s ease-in-out",
          }}
        />
      </div>
      <div style={{ background: "black" }}>
        <Collapsible open={open}>
          {dir.legs[0].steps.map((x: any) => {
            return (
              <p
                key={Math.random()}
                style={{
                  padding: "10px",
                  backgroundColor: "black",
                  margin: "0px",
                  color: "lightgray",
                }}
              >
                {x.maneuver.instruction}
              </p>
            );
          })}
        </Collapsible>
      </div>
    </div>
  );
};

export default DirBox;
