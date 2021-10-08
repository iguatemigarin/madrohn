import React from 'react'
import { masterGain } from './globals'
import { Theme } from './App';
import './Drawbar.css'

type VolumeProps = {
  theme: Theme;
  volume: number;
};

const VolumeBar: React.FC<VolumeProps> = ({ theme, volume }) => {
  return <div className={`Drawbar__volume m-${theme}`} style={{ height: volume }}></div>
}

type DrawbarProps = {
  theme: Theme
  note: string;
  rootNote: boolean;
  paint: boolean;
  oscillator: { osc: OscillatorNode, oscGain: GainNode, stop: () => void }
};

// TODO get from computed style
const organMaxHeight = 300

const calculateVolume = (offsetY: number) => {
  // const perceptionProportion = 1 / ((index + 1) * 1.1)
  return Math.min(
    ((organMaxHeight - offsetY) / organMaxHeight),
    1
  )
}

export const Drawbar: React.FC<DrawbarProps> = ({ theme, note, rootNote, paint, oscillator }) => {
  const [volume, setVolume] = React.useState(0)

  React.useEffect(() => {
    const adjustedVolume = volume / organMaxHeight
    console.log('volume', adjustedVolume)
    oscillator.oscGain.gain.value = adjustedVolume
    oscillator.oscGain.connect(masterGain)
  }, [volume])
  return (
    <div
      className={`Drawbar ${rootNote ? 'm-root' : ''} m-${theme}`}
      onMouseMove={(e) => paint && setVolume(organMaxHeight - e.nativeEvent.offsetY)}
      onMouseDown={(e) => setVolume(organMaxHeight - e.nativeEvent.offsetY)}
      onDoubleClick={() => { setVolume(0); oscillator.stop() }}
    >
      {note}
      <VolumeBar theme={theme} volume={volume} />
    </div>
  )
}
