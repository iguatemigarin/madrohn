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
  // Essa porra tambem nao da pra simplificar caralho? 
  const [theme, setTheme] = React.useState(localStorage.getItem("theme") === Theme.dark ? Theme.dark : Theme.white)

  React.useEffect(() => {
    localStorage.setItem("theme", theme)
  }, [theme])

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
