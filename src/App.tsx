import './App.css'
import { Organ } from './Organ'
import React from 'react'
import { Scales } from './scales'
import { createOscillator } from './osc'

export enum Theme {
  white = "white",
  dark = "dark"
}

const generators = Scales.major.map(createOscillator)

export const App: React.FC = ({ }) => {
  const [theme, setTheme] = React.useState(Theme.white)
  return (
    <div className={`App m-${theme}`}>
      <Organ theme={theme} scale={Scales.major} onThemeChange={(chosenTheme: Theme) => setTheme(chosenTheme)} generators={generators}></Organ>
      {/* Nao tem como simplesmente togglar essa merda? */}
      <button onClick={() => setTheme(theme === Theme.dark ? Theme.white : Theme.dark)}>Luke</button>
    </div>
  );
}

export default App
