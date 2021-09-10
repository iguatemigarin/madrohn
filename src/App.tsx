import React from "react";
import { Organ } from "./Organ";
import { Scales } from "./scales";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Organ scale={Scales.major}></Organ>
    </div>
  );
}

export default App;
