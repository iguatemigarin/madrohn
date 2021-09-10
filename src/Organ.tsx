import React from "react";
import { Drawbar } from "./Drawbar";
import "./Organ.css";

type OrganProps = {
  scale: {
    note: string,
    frequency: number
  }[];
};

export const Organ: React.FC<OrganProps> = ({ scale }) => {
  const [paint, setPaint] = React.useState(false);
  return (
    <div className="Organ" onMouseDown={() => setPaint(true)} onMouseUp={() => setPaint(false)}>
      {scale.map((note, index) => (
        <Drawbar paint={paint} key={index} note={note.note} rootNote={index % 7 === 0}></Drawbar>
      ))}
    </div>
  );
};
