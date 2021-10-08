import './App.css'
import { Organ } from './Organ'
import React from 'react'
import { Scales } from './scales'
import { createAudioGenerator } from './osc'

const audioGenerators = Scales.major.map(createAudioGenerator)

export enum Theme {
  white = 'white',
  dark = 'dark'
}

export const App: React.FC = () => {
  const [theme, setTheme] = React.useState(Theme.white)
  console.log('rerender')
  return (
    <div className={`App m-${theme}`}>
      <Organ
        theme={theme}
        onThemeChange={(chosenTheme: Theme) => setTheme(chosenTheme)}
        audioGenerators={audioGenerators}
      />
      {/* Nao tem como simplesmente togglar essa merda? */}
      <button onClick={() => setTheme(theme === Theme.dark ? Theme.white : Theme.dark)}>Luke</button>
    </div>
  )
}

export default App
