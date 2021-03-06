import { Nodes } from './dom'
import { gain } from './globals'
import { playNotes } from './osc'

let stop: () => unknown = () => undefined

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
gain.gain.value = Nodes.volume.value

Nodes.playChord.addEventListener('click', () => {
  stop()
  Nodes.oscs.innerHTML = ''
  stop = playNotes()
})

Nodes.volume.addEventListener('change', (e) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  gain.gain.value = e.target?.value
})

stop = playNotes()
