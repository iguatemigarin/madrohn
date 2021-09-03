export const ctx = new window.AudioContext()
export const gain = ctx.createGain()
gain.connect(ctx.destination)
