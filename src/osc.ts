import { audioContext, masterGain } from './globals'

export type AudioGenerator = {
  osc: OscillatorNode;
  stop: () => void;
  setVolume: (volume: number, organMaxHeight: number, index: number) => void;
  note: string;
}

const calculateVolume = (volume: number, organMaxHeight: number, index: number) => {
  const perceptionProportion = 1 / ((index + 1) * 1.1)
  const adjustedVolume = volume / organMaxHeight * perceptionProportion
  return adjustedVolume
}

export const createAudioGenerator = ({ note, frequency }: { note: string, frequency: number }): AudioGenerator => {
  let isStarted = false
  const osc = audioContext.createOscillator()
  const oscGain = audioContext.createGain()
  const sineTerms = new Float32Array([0, 1])
  const cosineTerms = new Float32Array(sineTerms.length)
  const customWaveform = audioContext.createPeriodicWave(
    cosineTerms,
    sineTerms
  )

  oscGain.gain.value = 0
  oscGain.connect(masterGain)
  osc.setPeriodicWave(customWaveform)
  osc.frequency.setValueAtTime(frequency, audioContext.currentTime)
  osc.connect(oscGain)

  const stop = () => {
    osc.stop()
  }

  const setVolume = (volume: number, organMaxHeight: number, index: number): void => {
    oscGain.gain.value = calculateVolume(volume, organMaxHeight, index)
    if (!isStarted) {
      osc.start()
      isStarted = true
    }

    if (audioContext.state !== 'running') {
      audioContext.resume()
    }
  }

  return { osc, stop, note, setVolume }
}
