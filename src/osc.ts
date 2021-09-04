import { Nodes, h } from './dom'
import { ctx, gain } from './globals'
import { getMajorScale } from './scales'

function createNoteOsc(freq: number, index: number) {
  let isPlaying = false
  let isMouseDown = false
  let paint = false
  const volume = 0.3

  const drawbar = h('div')
  drawbar.classList.add('drawbar')
  if (index % 7 === 0) {
    drawbar.classList.add('root')
  }

  const oscs = Nodes.oscs

  const oscCtrl = h('div')
  oscCtrl.classList.add('osc-ctrl')

  const volumeCtrl = h('div')
  volumeCtrl.classList.add('volume')
  container.appendChild(oscCtrl)
  drawbar.appendChild(volumeCtrl)

  let osc: OscillatorNode
  const oscGain = ctx.createGain()
  oscGain.gain.value = volume
  oscGain.connect(gain)

  const stop = () => {
    if (osc) {
      osc.stop()
    }
    oscCtrl.classList.remove('playing')
  }

  const start = () => {
    // const sineTerms = new Float32Array([0, 1, 0.05, 0, 0.01, 0.01, 0.005]);
    const sineTerms = new Float32Array([0, 1])
    const cosineTerms = new Float32Array(sineTerms.length)
    const customWaveform = ctx.createPeriodicWave(cosineTerms, sineTerms)
    osc = ctx.createOscillator()
    osc.setPeriodicWave(customWaveform)
    osc.frequency.setValueAtTime(freq, ctx.currentTime)
    osc.connect(oscGain)
    osc.start()
    oscCtrl.classList.add('playing')
  }

  const calculateVolume = (offsetY: number) => {
    const perceptionProportion = 1 / ((index + 1) * 1.1)
    // console.log(perceptionProportion);
    const maxHeight = parseInt(getComputedStyle(oscCtrl).height, 10)
    const volume = Math.min(
      ((maxHeight - offsetY) / maxHeight) * perceptionProportion,
      1
    )
    oscGain.gain.value = volume
    volumeCtrl.style.height = maxHeight - offsetY + 'px'
  }
  
  oscs.addEventListener('mousedown', () => {
    paint = true
  })

  oscs.addEventListener('mouseup', () => {
    paint = false
  })

  oscCtrl.addEventListener('dblclick', () => {
    calculateVolume(300)
  })

  oscCtrl.addEventListener("mousedown", (e: MouseEvent) => {
    calculateVolume(e.offsetY)
    if (!isPlaying) {
      start()
      isPlaying = true
    }
  })
  
  oscCtrl.addEventListener('mousemove', (e: MouseEvent) => {
    if (paint) {
      calculateVolume(e.offsetY)
      if(!isPlaying){
        start()
        isPlaying = true
      }
    }
  })

  Nodes.oscs.appendChild(drawbar)

  return () => {
    stop()
  }
}

export function playNotes(): () => void {
  // const C2 = 65.41;
  // const G1 = 49;

  // const notes = getOctavesFromIntonation(getEqualTemperamentIntonation(G1))
  // .reduce((memo, octave) => [...memo, ...octave], [])

  const notes = getMajorScale().map((note, i) => createNoteOsc(note, i))

  return () => {
    notes.forEach((remove) => remove())
    Nodes.oscs.innerHTML = ''
  }
}
