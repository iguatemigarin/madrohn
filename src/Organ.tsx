import React from "react";
import { Theme } from "./App";
import { Drawbar } from "./Drawbar";
import "./Organ.css";
import { createOscillator } from "./osc";

type OrganProps = {
  theme: Theme,
  scale: {
    note: string,
    frequency: number
  }[],
  onThemeChange: (chosenTheme: Theme) => void;
};

export const Organ: React.FC<OrganProps> = ({ theme, scale, onThemeChange }) => {
  const [paint, setPaint] = React.useState(false);
  return (
    <div className="Organ" onMouseDown={() => setPaint(true)} onMouseUp={() => setPaint(false)}>
      {scale.map((note, index) => {
        const oscillator = createOscillator(note.frequency);
        return (
          <Drawbar theme={theme} oscillator={oscillator} paint={paint} key={index} note={note.note} rootNote={index % 7 === 0}></Drawbar>
        )
      }
      )}
    </div>
  );
};
