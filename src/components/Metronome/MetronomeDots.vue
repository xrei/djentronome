<template>
  <div class="metronome-dots">
    <span
      v-for="(b, k) in dots"
      :key="k"
      class="metronome-dots__dot"
      :class="beatClass(k+1)"
    />
  </div>
</template>

<script>
export default {
  props: {
    beat: {
      type: Number,
      default: 1
    },
    dots: Number
  },
  data: () => ({
    beats: 4,
    accent: false
  }),
  watch: {
    beat (v) {
      if (v === 1) this.accent = true
      else this.accent = false
    }
  },
  methods: {
    beatClass (k) {
      return (this.beat === k && this.accent) ? 'accent_first' : '' ||
              (this.beat === k && !this.accent) ? 'accent' : ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.metronome-dots
  display inline-flex
  margin 1rem 0
  &__dot
    margin 0 .5rem
    border-radius 1%
    width 1.5rem
    height 1.5rem
    background-color rgba(189, 189, 189, 1)
    transition-prperty color, background-color
    transition .3s ease-out
  .accent
    background-color #3d5afe
    box-shadow 0 0 5px 2px #3d5afe
  .accent_first
    background-color #ff4081
    box-shadow 0 0 5px 2px #ff4081
</style>
