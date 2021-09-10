import React from "react";
import "./Drawbar.css";

type VolumeProps = {
  height: number;
};

const Volume: React.FC<VolumeProps> = ({ height }) => {
  return <div className="Drawbar__volume" style={{ height: height }}></div>;
};

type DrawbarProps = {
  note: string;
  rootNote: boolean;
  paint: boolean;
};

const organMaxHeight = 300;

export const Drawbar: React.FC<DrawbarProps> = ({ note, rootNote, paint }) => {
  const [height, setHeight] = React.useState(0);
  return (
    <div
      className={`Drawbar ${rootNote ? "m-root" : ""}`}
      onMouseMove={(e) => paint && setHeight(organMaxHeight - e.nativeEvent.offsetY)}
    >
      {note}
      <Volume height={height} />
    </div>
  );
};
