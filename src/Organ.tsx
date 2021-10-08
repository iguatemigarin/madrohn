import './Organ.css'
import { AudioGenerator } from './osc'
import { Drawbar } from './Drawbar'
import React from 'react'
import { Theme } from './App'

type OrganProps = {
  audioGenerators: AudioGenerator[]
  theme: Theme,
  onThemeChange: (chosenTheme: Theme) => void;
};

export const Organ: React.FC<OrganProps> = ({ audioGenerators, theme }) => {
  const [paint, setPaint] = React.useState(false)
  return (
    <div className="Organ" onMouseDown={() => setPaint(true)} onMouseUp={() => setPaint(false)}>
      {audioGenerators.map((audioGenerator, index) => {
        return (
          <Drawbar
            audioGenerator={audioGenerator}
            theme={theme}
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
