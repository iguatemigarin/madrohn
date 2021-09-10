import React from "react";
import { Drawbar } from "./Drawbar";
import "./Organ.css";

type OrganProps = {
  scale: number[];
};

export const Organ: React.FC<OrganProps> = ({ scale }) => {
  return (
    <div className="Organ">
      {scale.map((note, index) => (
        <Drawbar key={index} note={note} rootNote={index % 7 === 0}></Drawbar>
      ))}
    </div>
  );
};
