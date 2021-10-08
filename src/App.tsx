import './App.css'
import { Organ } from './Organ'
import React from 'react'
import { Scales } from './scales'
import { createOscillator } from './osc'

const generators = Scales.major.map(createOscillator)

const App: React.FC = () =>
  <div className="App">
    <Organ generators={generators}></Organ>
  </div>

export default App
