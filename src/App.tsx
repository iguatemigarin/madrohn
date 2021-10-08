import React from "react";
import { Organ } from "./Organ";
import { Scales } from "./scales";
import "./App.css";

export enum Theme {
  white = "white",
  dark = "dark"
}

export const App: React.FC = ({ }) => {
  const [theme, setTheme] = React.useState(Theme.white)
  return (
    <div className={`App m-${theme}`}>
      <Organ theme={theme} scale={Scales.major} onThemeChange={(chosenTheme: Theme) => setTheme(chosenTheme)}></Organ>
      {/* Nao tem como simplesmente togglar essa merda? */}
      <button onClick={() => setTheme(theme === Theme.dark ? Theme.white : Theme.dark)}>Luke</button>
    </div>
  );
}

export default App;
