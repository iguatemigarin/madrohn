import './Drawbar.css'
import { AudioGenerator } from './osc'
import React from 'react'

type VolumeProps = {
  volume: number;
};

const VolumeBar: React.FC<VolumeProps> = ({ volume }) => {
  return <div className="Drawbar__volume" style={{ height: volume }}></div>
}

type DrawbarProps = {
  rootNote: boolean;
  paint: boolean;
  audioGenerator: AudioGenerator;
  index: number;
};

// TODO get from computed style
const organMaxHeight = 300

export const Drawbar: React.FC<DrawbarProps> = ({ rootNote, paint, audioGenerator, index }) => {
  const [volume, setVolume] = React.useState(0)

  React.useEffect(() => {
    audioGenerator.setVolume(volume, organMaxHeight, index)
  }, [volume])

  return (
    <div
      className={`Drawbar ${rootNote ? 'm-root' : ''}`}
      onMouseMove={(e) => paint && setVolume(organMaxHeight - e.nativeEvent.offsetY)}
      onMouseDown={(e) => setVolume(organMaxHeight - e.nativeEvent.offsetY)}
      onDoubleClick={() => { setVolume(0); audioGenerator.stop() }}
    >
      {audioGenerator.note}
      <VolumeBar volume={volume} />
    </div>
  )
}
