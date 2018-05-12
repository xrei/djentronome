
export function changeFreq (ctx, frq, now) {
  return ctx.frequency.setValueAtTime(frq, 0)
}

export function convertBpm (bpm, beat) {
  const noteDurations = {
    1: bpm / 4,
    2: bpm / 2,
    4: bpm,
    8: bpm * 2,
    16: bpm * 4,
    32: bpm * 8
  }
  const ms = (60000 / noteDurations[beat])

  return ms
}
