import './App.css'
import { Organ } from './Organ'
import React from 'react'
import { Scales } from './scales'
import { createAudioGenerator } from './osc'

const audioGenerators = Scales.major.map(createAudioGenerator)

const App: React.FC = () =>
  <div className="App">
    <Organ audioGenerators={audioGenerators}></Organ>
  </div>

export default App
