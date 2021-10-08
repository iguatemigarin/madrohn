export const getJustIntonation = (freq: number): number[] => [
  freq * 1,
  freq * (9 / 8),
  freq * (5 / 4),
  freq * (4 / 3),
  freq * (3 / 2),
  freq * (5 / 3),
  freq * (15 / 8),
]

export const getPythagoreanIntonation = (freq: number): number[] => [
  freq * 1,
  freq * (9 / 8),
  freq * (81 / 64),
  freq * (4 / 3),
  freq * (3 / 2),
  freq * (27 / 16),
  freq * (243 / 128),
]

export const getEqualTemperamentIntonation = (freq: number): number[] => [
  freq * 1,
  freq * 1.122462,
  freq * 1.259921,
  freq * 1.33484,
  freq * 1.498307,
  freq * 1.587401,
  freq * 1.887749,
]

export const getOctavesFromIntonation = (freqs: number[]): number[][] => {
  const octaves = []
  for (let i = 0; i < 5; i++) {
    const octave = freqs.reduce<number[]>((memo, freq) => {
      return [...memo, freq * (i + 1)]
    }, [])
    octaves.push(octave)
  }
  return octaves
}

export const getDefaultOctaves = (): number[] => [
  16.35, 17.32, 18.35, 19.45, 20.6, 21.83, 23.12, 24.5, 25.96, 27.5, 29.14,
  30.87, 32.7, 34.65, 36.71, 38.89, 41.2, 43.65, 46.25, 49, 51.91, 55, 58.27,
  61.74, 65.41, 69.3, 73.42, 77.78, 82.41, 87.31, 92.5, 98, 103.83, 110, 116.54,
  123.47, 130.81, 138.59, 146.83, 155.56, 164.81, 174.61, 185, 196, 207.65, 220,
  233.08, 246.94, 261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392,
  415.3, 440, 466.16, 493.88, 523.25, 554.37, 587.33, 622.25, 659.25, 698.46,
  739.99, 783.99, 830.61, 880, 932.33, 987.77, 1046.5, 1108.73, 1174.66,
  1244.51, 1318.51, 1396.91, 1479.98, 1567.98, 1661.22, 1760, 1864.66, 1975.53,
  2093, 2217.46, 2349.32, 2489.02, 2637.02, 2793.83, 2959.96, 3135.96, 3322.44,
  3520, 3729.31, 3951.07, 4186.01, 4434.92, 4698.63, 4978.03, 5274.04, 5587.65,
  5919.91, 6271.93, 6644.88, 7040, 7458.62, 7902.13,
]

export const Scales = {
  major: [
    { note: 'C1', frequency: 32.7 },
    { note: 'D1', frequency: 36.71 },
    { note: 'E1', frequency: 41.2 },
    { note: 'F1', frequency: 43.65 },
    { note: 'G1', frequency: 49 },
    { note: 'A1', frequency: 55 },
    { note: 'B1', frequency: 61.74 },
    { note: 'C2', frequency: 65.41 },
    { note: 'D2', frequency: 73.42 },
    { note: 'E2', frequency: 82.41 },
    { note: 'F2', frequency: 87.31 },
    { note: 'G2', frequency: 98 },
    { note: 'A2', frequency: 110 },
    { note: 'B2', frequency: 123.47 },
    { note: 'C3', frequency: 130.81 },
    { note: 'D3', frequency: 146.83 },
    { note: 'E3', frequency: 164.81 },
    { note: 'F3', frequency: 174.61 },
    { note: 'G3', frequency: 196 },
    { note: 'A3', frequency: 220 },
    { note: 'B3', frequency: 246.94 },
    { note: 'C4', frequency: 261.63 },
    { note: 'D4', frequency: 293.66 },
    { note: 'E4', frequency: 329.63 },
    { note: 'F4', frequency: 349.23 },
    { note: 'G4', frequency: 392 },
    { note: 'A4', frequency: 440 },
    { note: 'B4', frequency: 493.88 },
    { note: 'C5', frequency: 523.25 },
    { note: 'D5', frequency: 587.33 },
    { note: 'E5', frequency: 659.25 },
    { note: 'F5', frequency: 698.46 },
    { note: 'G5', frequency: 783.99 },
    { note: 'A5', frequency: 880 },
    { note: 'B5', frequency: 987.77 },
    { note: 'C6', frequency: 1046.5 },
    { note: 'D6', frequency: 1174.66 },
    { note: 'E6', frequency: 1318.51 },
    { note: 'F6', frequency: 1396.91 },
    { note: 'G6', frequency: 1567.98 },
    { note: 'A6', frequency: 1760 },
    { note: 'B6', frequency: 1975.53 },
    { note: 'C7', frequency: 2093 },
    { note: 'D7', frequency: 2349.32 },
    { note: 'E7', frequency: 2637.02 },
    { note: 'F7', frequency: 2793.83 },
    { note: 'G7', frequency: 3135.96 },
    { note: 'A7', frequency: 3520 },
    { note: 'B7', frequency: 3951.07 },
    { note: 'C8', frequency: 4186.01 },
    { note: 'D8', frequency: 4698.63 },
    { note: 'E8', frequency: 5274.04 },
    { note: 'F8', frequency: 5587.65 },
    { note: 'G8', frequency: 6271.93 },
    { note: 'A8', frequency: 7040 },
    { note: 'B8', frequency: 7902.13 },
  ],
}
