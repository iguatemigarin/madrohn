import './Drawbar.css'
import React from 'react'
import { masterGain } from './globals'

type VolumeProps = {
  volume: number;
};

const VolumeBar: React.FC<VolumeProps> = ({ volume }) => {
  return <div className="Drawbar__volume" style={{ height: volume }}></div>
}

type DrawbarProps = {
  note: string;
  rootNote: boolean;
  paint: boolean;
  oscillator: { osc: OscillatorNode, oscGain: GainNode, stop: () => void };
  index: number;
};

// TODO get from computed style
const organMaxHeight = 300

const calculateVolume = (volume: number, index: number) => {
  const perceptionProportion = 1 / ((index + 1) * 1.1)
  const adjustedVolume = volume / organMaxHeight * perceptionProportion
  return adjustedVolume
}

export const Drawbar: React.FC<DrawbarProps> = ({ note, rootNote, paint, oscillator, index }) => {
  const [volume, setVolume] = React.useState(0)

  // ! BE VERY CAREFUL WHEN UNCOMMENTING THIS SHIT, SHIT CAN GET LOUD
  React.useEffect(() => {
    oscillator.oscGain.gain.value = calculateVolume(volume, index)
  }, [volume])

  React.useEffect(() => {
    oscillator.oscGain.connect(masterGain)
  }, [])
  return (
    <div
      className={`Drawbar ${rootNote ? 'm-root' : ''}`}
      onMouseMove={(e) => paint && setVolume(organMaxHeight - e.nativeEvent.offsetY)}
      onMouseDown={(e) => setVolume(organMaxHeight - e.nativeEvent.offsetY)}
      onDoubleClick={() => { setVolume(0); oscillator.stop() }}
    >
      {note}
      <VolumeBar volume={volume} />
    </div>
  )
}
