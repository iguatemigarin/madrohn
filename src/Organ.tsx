import React from "react";
import { Theme } from "./App";
import { Drawbar } from "./Drawbar";
import { AudioGenerator } from './osc'
import "./Organ.css";

type OrganProps = {
  generators: AudioGenerator[]
  theme: Theme,
  scale: {
    note: string,
    frequency: number
  }[],
  onThemeChange: (chosenTheme: Theme) => void;
};

export const Organ: React.FC<OrganProps> = ({ scale, theme, generators }) => {
  const [paint, setPaint] = React.useState(false);

  return (
    <div className="Organ" onMouseDown={() => setPaint(true)} onMouseUp={() => setPaint(false)}>
      {generators.map((generator, index) => {
        return (
          <Drawbar
            theme={theme}
            generator={generator}
            paint={paint}
            key={index}
            rootNote={index % 7 === 0}
            index={index}
          />
        )
      }
      )}
    </div>
  )
}
