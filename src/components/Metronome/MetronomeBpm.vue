<template>
  <section class="metronome-tempo flex-center">
    <div class="flex-row">
      <div class="signature-selects">
        <div class="select-cont">
          <label for="">Bars</label>
          <select class="select"
            v-model="bar"
            @change="selectHandler"
          >
            <option v-for="o in totalBars" :key="o" :value="o" :selected="o === 4">{{ o }}</option>
          </select>
        </div>
        <span class="delimeter">/</span>
        <div class="select-cont">
          <label for="">Beats</label>
          <select
            class="select"
            v-model="beat"
          >
            <option v-for="o in totalBeats" :key="o" :value="o" :selected="o === 4">{{ o }}</option>
          </select>
        </div>
      </div>
      <app-input
        class="bpm-input"
        v-model.number="lazyBpm"
        type="number"
        :step="1"
        :max="300"
        :min="1"
      >BPM</app-input>
    </div>
    <div class="flex-row bpm-slider">
      <label for="">Bpm</label>
      <input type="range" min="1" max="300" v-model.number="lazyBpm"/>
    </div>
    <div class="flex-row">
      <label for="">Volume</label>
      <input type="range" min="0.1" max="1" step="0.1" v-model.number="vol"/>
    </div>
  </section>
</template>

<script>
import AppInput from '../Input/InputField.vue'

export default {
  components: {
    AppInput
  },
  props: {
    bpm: {
      type: Number,
      default: 128
    }
  },
  data: () => ({
    vol: 1,
    lazyBpm: 0,
    totalBars: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    totalBeats: [1, 2, 4, 8, 16, 32],
    bar: 4,
    beat: 4
  }),
  methods: {
    selectHandler (e) {
      this.$emit('signatureChanged', e.target.value)
    }
  },
  watch: {
    beat (v) {
      this.$emit('beatTypeChanged', v)
    },
    lazyBpm (v) {
      this.$emit('bpmChanged', v)
    },
    vol (v) {
      this.$emit('volChanged', v)
    }
  },
  beforeMount () {
    this.lazyBpm = this.bpm
  }
}

</script>

<style lang="stylus" scoped>
.metronome
  &-tempo
    display flex
    flex-flow column
    margin-bottom 1rem
    width 320px
.bpm-input
  width 60px !important

.signature-selects
  display flex
  align-items center
  margin-right 1rem
  .select-cont
    position relative
    margin-top .2rem
    label
      position absolute
      top -1.25rem
      left .1rem
      text-transform uppercase
      font-size 14px
      font-weight 500
      color #4285f4
  .delimeter
    margin 0 .5rem
    line-height 22px
    font-size 22px
  .select
    line-height 22px
    padding-left 4px
    font-size 22px
    border 0
    background-color transparent
    color #fff
    width 58px
    border-bottom 1px solid #4285f4
    option
      background-color #212121
      border 0
      outline 0
</style>
