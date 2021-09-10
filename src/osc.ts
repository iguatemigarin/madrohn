import { audioContext, masterGain } from "./globals";

export const createOscillator = (freq: number) => {
  let osc: OscillatorNode;
  const oscGain = audioContext.createGain();
  const sineTerms = new Float32Array([0, 1]);
  const cosineTerms = new Float32Array(sineTerms.length);
  const customWaveform = audioContext.createPeriodicWave(
    cosineTerms,
    sineTerms
  );

  oscGain.gain.value = 0;
  oscGain.connect(masterGain);
  osc = audioContext.createOscillator();
  osc.setPeriodicWave(customWaveform);
  osc.frequency.setValueAtTime(freq, audioContext.currentTime);
  osc.connect(oscGain);
  osc.start();

  const stop = () => {
    osc.stop();
  };

  return { osc, oscGain, stop };
};
