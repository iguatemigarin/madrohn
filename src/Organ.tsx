import './Organ.css'
import { AudioGenerator } from './osc'
import { Drawbar } from './Drawbar'
import React from 'react'

type OrganProps = {
  generators: AudioGenerator[]
};

export const Organ: React.FC<OrganProps> = ({ generators }) => {
  const [paint, setPaint] = React.useState(false)
  return (
    <div className="Organ" onMouseDown={() => setPaint(true)} onMouseUp={() => setPaint(false)}>
      {generators.map((generator, index) => {
        return (
          <Drawbar
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
