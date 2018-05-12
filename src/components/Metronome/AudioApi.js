// Audio api creator
export default function AuidoApi () {
  const audio = new (window.AudioContext || window.webkitAudioContext)()
  const tick = audio.createOscillator()
  const tickGain = audio.createGain()

  return { audio, tick, tickGain }
}
