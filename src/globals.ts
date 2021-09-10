export const audioContext = new window.AudioContext();
export const masterGain = audioContext.createGain();
masterGain.connect(audioContext.destination);
