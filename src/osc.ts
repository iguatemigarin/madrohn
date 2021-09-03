import { ctx, gain } from "./globals";
import { h, Nodes } from "./dom";
import {
  getDefaultOctaves,
  getEqualTemperamentIntonation,
  getJustIntonation,
  getOctavesFromIntonation,
  getPythagoreanIntonation,
  getMajorScale
} from "./scales";

function createNoteOsc(freq: number = 65.41, index: number) {
  let isPlaying = false;
  let isMouseDown = false;
  let volume = 0.3;

  const container = h("div");
  container.classList.add("note");
  if (index % 7 === 0) {
    container.classList.add("root");
  }

  const oscCtrl = h("div");
  oscCtrl.classList.add("osc-ctrl");

  const volumeCtrl = h("div");
  volumeCtrl.classList.add("volume");
  container.appendChild(volumeCtrl);
  container.appendChild(oscCtrl);

  let osc: OscillatorNode;
  const oscGain = ctx.createGain();
  oscGain.gain.value = volume;
  oscGain.connect(gain);

  const stop = () => {
    if (osc) {
      osc.stop();
    }
    oscCtrl.classList.remove("playing");
  };

  const start = () => {
    // const sineTerms = new Float32Array([0, 1, 0.05, 0, 0.01, 0.01, 0.005]);
    const sineTerms = new Float32Array([0, 1]);
    const cosineTerms = new Float32Array(sineTerms.length);
    const customWaveform = ctx.createPeriodicWave(cosineTerms, sineTerms);
    osc = ctx.createOscillator();
    osc.setPeriodicWave(customWaveform);
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.connect(oscGain);
    osc.start();
    oscCtrl.classList.add("playing");
  };

  const calculateVolume = (offsetY: number) => {
    const perceptionProportion = 1 / ((index + 1) * 1.1);
    // console.log(perceptionProportion);
    const maxHeight = parseInt(getComputedStyle(oscCtrl).height, 10);
    const volume = Math.min(
      ((maxHeight - offsetY) / maxHeight) * perceptionProportion,
      1
    );
    oscGain.gain.value = volume;
    volumeCtrl.style.height = maxHeight - offsetY + "px";
  };

  oscCtrl.addEventListener("mousedown", (e: MouseEvent) => {
    calculateVolume(e.offsetY);
    if (!isPlaying) {
      start();
      isPlaying = true;
    }
    isMouseDown = true;
  });

  oscCtrl.addEventListener("mouseup", (e: MouseEvent) => {
    if (isMouseDown) {
      calculateVolume(e.offsetY);
    }
    isMouseDown = false;
  });

  oscCtrl.addEventListener("mousemove", (e: MouseEvent) => {
    if (isMouseDown) {
      calculateVolume(e.offsetY);
    }
  });

  oscCtrl.addEventListener("mouseout", (e: MouseEvent) => {
    isMouseDown = false;
  });

  Nodes.oscs.appendChild(container);

  return () => {
    stop();
  };
}

export function playNotes() {
  // const C2 = 65.41;
  // const G1 = 49;

  // const notes = getOctavesFromIntonation(getEqualTemperamentIntonation(G1))
  // .reduce((memo, octave) => [...memo, ...octave], [])

  const notes = getMajorScale().map((note, i) => createNoteOsc(note, i));

  return () => {
    notes.forEach((remove) => remove());
    Nodes.oscs.innerHTML = "";
  };
}
