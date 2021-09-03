import { Nodes } from "./dom";
import { playNotes } from "./osc";
import { gain } from "./globals";

let stop = () => {};

gain.gain.value = Nodes.volume.value;

Nodes.playChord.addEventListener("click", () => {
  stop();
  Nodes.oscs.innerHTML = "";
  stop = playNotes();
});

Nodes.volume.addEventListener("change", (e) => {
  gain.gain.value = e.target.value;
});

stop = playNotes();
