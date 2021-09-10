import React from "react";
import { audioContext, masterGain } from "./globals";
import "./Drawbar.css";

type VolumeProps = {
  volume: number;
};

const VolumeBar: React.FC<VolumeProps> = ({ volume }) => {
  return <div className="Drawbar__volume" style={{ height: volume }}></div>;
};

type DrawbarProps = {
  note: string;
  rootNote: boolean;
  paint: boolean;
  oscillator: { osc: OscillatorNode, oscGain: GainNode, stop: () => void }
};

// TODO get from computed style
const organMaxHeight = 300;

export const Drawbar: React.FC<DrawbarProps> = ({ note, rootNote, paint, oscillator }) => {
  const [volume, setVolume] = React.useState(0)
  console.log('volume', volume);
  React.useEffect(() => {
    setVolume(volume)
    oscillator.oscGain.gain.value = volume
    oscillator.oscGain.connect(masterGain)
  }, [volume])
  return (
    <div
      className={`Drawbar ${rootNote ? "m-root" : ""}`}
      onMouseMove={(e) => paint && setVolume(organMaxHeight - e.nativeEvent.offsetY)}
      onMouseDown={(e) => setVolume(organMaxHeight - e.nativeEvent.offsetY)}
      onDoubleClick={() => { setVolume(0); oscillator.stop() }}
    >
      {note}
      <VolumeBar volume={volume} />
    </div>
  );
};
