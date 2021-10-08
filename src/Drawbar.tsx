import React from 'react'
import { masterGain } from './globals'
import { Theme } from './App';
import './Drawbar.css'
import { AudioGenerator } from './osc'

type VolumeProps = {
  theme: Theme;
  volume: number;
};

const VolumeBar: React.FC<VolumeProps> = ({ theme, volume }) => {
  return <div className={`Drawbar__volume m-${theme}`} style={{ height: volume }}></div>
}

type DrawbarProps = {
  theme: Theme
  rootNote: boolean;
  paint: boolean;
  generator: AudioGenerator;
  index: number;
};

// TODO get from computed style
const organMaxHeight = 300

export const Drawbar: React.FC<DrawbarProps> = ({ theme, rootNote, paint, generator, index }) => {
  const [volume, setVolume] = React.useState(0)

  React.useEffect(() => {
    generator.setVolume(volume, organMaxHeight, index)
  }, [volume])

  return (
    <div
      className={`Drawbar ${rootNote ? 'm-root' : ''} m-${theme}`}
      onMouseMove={(e) => paint && setVolume(organMaxHeight - e.nativeEvent.offsetY)}
      onMouseDown={(e) => setVolume(organMaxHeight - e.nativeEvent.offsetY)}
      onDoubleClick={() => { setVolume(0); generator.stop() }}
    >
      {generator.note}
      <VolumeBar theme={theme} volume={volume} />
    </div >
  )
}
