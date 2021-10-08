import './Organ.css'
import { AudioGenerator } from './osc'
import { Drawbar } from './Drawbar'
import React from 'react'

type OrganProps = {
  audioGenerators: AudioGenerator[]
};

export const Organ: React.FC<OrganProps> = ({ audioGenerators }) => {
  const [paint, setPaint] = React.useState(false)
  return (
    <div className="Organ" onMouseDown={() => setPaint(true)} onMouseUp={() => setPaint(false)}>
      {audioGenerators.map((audioGenerator, index) => {
        return (
          <Drawbar
            audioGenerator={audioGenerator}
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
