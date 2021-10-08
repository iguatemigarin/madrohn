import './Organ.css'
import { Drawbar } from './Drawbar'
import React from 'react'
import { createOscillator } from './osc'

type OrganProps = {
  scale: {
    note: string,
    frequency: number
  }[];
};

export const Organ: React.FC<OrganProps> = ({ scale }) => {
  const [paint, setPaint] = React.useState(false)
  return (
    <div className="Organ" onMouseDown={() => setPaint(true)} onMouseUp={() => setPaint(false)}>
      {scale.map((note, index) => {
        const oscillator = createOscillator(note.frequency)
        return (
          <Drawbar
            oscillator={oscillator}
            paint={paint}
            key={index}
            note={note.note}
            rootNote={index % 7 === 0}
            index={index}
          />
        )
      }
      )}
    </div>
  )
}
