<template>
  <main class="app-metronome">
    <div class="metronome-inner">
      <div class="metronome-beat">
        {{ beat }}
      </div>
      <Metronome-dots
        :beat="beat"
        :dots="timeBars"
      />
      <MetronomeBpm
        :bpm="bpm"
        @bpmChanged="updateBpm"
        @signatureChanged="updateSignature"
        @volChanged="updateVolume"
        @beatTypeChanged="updateBeatType"
      />
      <Btn class="btn_color"
        :class="started ? 'btn-color_r' : 'btn_color_g'"
        @click="toggleStart()"
      >{{ started ? 'Stop' : 'Play '}}</Btn>
    </div>
  </main>
</template>

<script>
import Btn from '../Button/Button.vue'
import MetronomeDots from './MetronomeDots.vue'
import MetronomeBpm from './MetronomeBpm.vue'
import { changeFreq, convertBpm } from '../../utils'
import AuidoApi from './AudioApi'

// make sure that we initialize it in browser, not on server-side because node doesn't have audio api.
if (process.browser) var { audio, tick, tickGain } = AuidoApi()

export default {
  components: {
    MetronomeDots,
    MetronomeBpm,
    Btn
  },
  data: () => ({
    started: false,
    bpm: 128,
    beat: 0,
    beatType: 4,
    timeBars: 4,
    volume: 1
  }),
  mounted () {
    this.init()
  },
  methods: {
    updateBeatType (v) {
      this.beatType = v
    },
    updateVolume (v) {
      this.volume = v
    },
    updateSignature (v) {
      this.timeBars = Number(v)
      this.beat = 0 // TODO1: ✅⚠️ fixed but still not quite good
    },
    updateBpm (v) {
      this.bpm = v
    },
    chBeat (now) {
      // TODO1: fix bug after switching bars beat is higher than total bars ⚠️
      if (this.beat !== this.timeBars && this.beat !== 0) {
        changeFreq(tick, 800)
        this.beat++
      } else {
        changeFreq(tick, 1300)
        this.beat = 1
      }
    },
    start () {
      let interval = convertBpm(this.bpm, this.beatType)
      let now = audio.currentTime

      tickGain.gain.cancelScheduledValues(now)
      tickGain.gain.setValueAtTime(0, now)

      tickGain.gain.linearRampToValueAtTime(this.volume, now + .001)
      tickGain.gain.linearRampToValueAtTime(0, now + .001 + 0.01)

      this.chBeat(now)
      this.click = setTimeout(this.start, interval)
    },
    stop () {
      clearTimeout(this.click)
      changeFreq(tick, 2500, 0)
      tickGain.gain.setValueAtTime(0, 0)
      this.beat = 0
    },
    toggleStart () {
      if (this.started) {
        this.stop()
        this.started = false
      } else {
        this.start(this.bpm)
        this.started = true
      }
    },
    init () {
      tick.type = 'square'
      tick.frequency.setValueAtTime(2500, 0)
      tickGain.gain.setValueAtTime(0, 0)
      tick.connect(tickGain)
      tickGain.connect(audio.destination)
      tick.start(0)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './metronome.styl'
</style>
