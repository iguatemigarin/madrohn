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
  generator: AudioGenerator;
  index: number;
};

// TODO get from computed style
const organMaxHeight = 300

export const Drawbar: React.FC<DrawbarProps> = ({ rootNote, paint, generator, index }) => {
  const [volume, setVolume] = React.useState(0)

  // ! BE VERY CAREFUL WHEN UNCOMMENTING THIS SHIT, SHIT CAN GET LOUD
  React.useEffect(() => {
    generator.setVolume(volume, organMaxHeight, index)
  }, [volume])

  return (
    <div
      className={`Drawbar ${rootNote ? 'm-root' : ''}`}
      onMouseMove={(e) => paint && setVolume(organMaxHeight - e.nativeEvent.offsetY)}
      onMouseDown={(e) => setVolume(organMaxHeight - e.nativeEvent.offsetY)}
      onDoubleClick={() => { setVolume(0); generator.stop() }}
    >
      {generator.note}
      <VolumeBar volume={volume} />
    </div>
  )
}
