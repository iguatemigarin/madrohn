import React from "react";
import "./Drawbar.css";

type VolumeProps = {
  height: number;
};

const Volume: React.FC<VolumeProps> = ({ height }) => {
  return <div className="Drawbar__volume" style={{ height: height }}></div>;
};

type DrawbarProps = {
  note: number;
  rootNote: boolean;
};

const organMaxHeight = 300;

export const Drawbar: React.FC<DrawbarProps> = ({ note, rootNote }) => {
  const [height, setHeight] = React.useState(0);
  return (
    <div
      className={`Drawbar ${rootNote ? "m-root" : ""}`}
      onMouseDown={(e) => setHeight(organMaxHeight - e.nativeEvent.offsetY)}
    >
      <Volume height={height} />
    </div>
  );
};
