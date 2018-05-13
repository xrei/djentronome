<template>
<div class="ui-slider" :class="sliderClass" tabindex="0"
  @focus="handleFocus"
  @blur="handleBlur"
  @touchstart="handleTouchStart"
  @touchend="handleTouchEnd"
  @touchcancel="handleTouchEnd"
  @mousedown="handleMouseDown"
  @mouseup="handleMouseUp"
  @mouseenter="handleMouseEnter"
  @mouseleave="handleMouseLeave"
>
  <input type="hidden" :value="inputValue">
  <div class="ui-slider_track"/>
  <div class="ui-slider_fill" :style="fillStyle"/>
  <div class="ui-slider_thumb" :style="thumbStyle"/>
  <label class="ui-slider_label">
    <slot/>
  </label>
</div>
</template>

<script>

export default {
  name: 'ui-slider',
  props: {
    value: {
      type: [Number, String],
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    min: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 0.1
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      inputValue: this.value,
      active: false,
      hover: false,
      focused: false,
      dragging: false
    }
  },
  computed: {
    percent () {
      let percentNum = Number(((this.inputValue - this.min) / (this.max - this.min) * 100).toFixed(3))
      return percentNum > 100 ? 100 : percentNum < 0 ? 0 : percentNum
    },
    fillStyle () {
      return {
        width: `${this.percent}%`
      }
    },
    thumbStyle () {
      return {
        left: `${this.percent}%`
      }
    },
    sliderClass () {
      return {
        zero: this.inputValue <= this.min,
        active: this.active,
        disabled: this.disabled
      }
    }
  },
  created () {
    this.handleDragMouseMove = this.handleDragMouseMove.bind(this)
    this.handleMouseEnd = this.handleMouseEnd.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
  },
  methods: {
    handleMouseDown (e) {
      if (this.disabled) return
      this.setValue(e)
      e.preventDefault()
      document.addEventListener('mousemove', this.handleDragMouseMove)
      document.addEventListener('mouseup', this.handleMouseEnd)
      this.$el.focus()
      this.onDragStart(e)
    },
    handleMouseUp () {
      if (this.disabled) return
      this.active = false
    },
    handleTouchStart (e) {
      if (this.disabled) return
      this.setValue(e.touches[0])
      document.addEventListener('touchmove', this.handleTouchMove)
      document.addEventListener('touchup', this.handleTouchEnd)
      document.addEventListener('touchend', this.handleTouchEnd)
      document.addEventListener('touchcancel', this.handleTouchEnd)
      e.preventDefault()
      this.onDragStart(e)
    },
    handleTouchEnd (e) {
      if (this.disabled) return
      document.removeEventListener('touchmove', this.handleTouchMove)
      document.removeEventListener('touchup', this.handleTouchEnd)
      document.removeEventListener('touchend', this.handleTouchEnd)
      document.removeEventListener('touchcancel', this.handleTouchEnd)
      this.onDragStop(e)
    },
    handleFocus () {
      if (this.disabled) return
      this.focused = true
    },
    handleBlur () {
      if (this.disabled) return
      this.focused = false
    },
    handleMouseEnter () {
      if (this.disabled) return
      this.hover = true
    },
    handleMouseLeave () {
      if (this.disabled) return
      this.hover = false
    },

    setValue (e) {
      const { $el, max, min, step } = this
      let val = (e.clientX - $el.getBoundingClientRect().left) / $el.offsetWidth * (max - min)
      val = Math.round(val / step) * step + min
      val = parseFloat(val.toFixed(5))
      if (val > max) {
        val = max
      } else if (val < min) {
        val = min
      }
      this.inputValue = val
      this.$emit('change', val)
    },

    onDragStart (e) {
      this.dragging = true
      this.active = true
      this.$emit('dragStart', e)
    },
    onDragUpdate (e) {
      if (this.dragRunning) return
      this.dragRunning = true
      window.requestAnimationFrame(() => {
        this.dragRunning = false
        if (!this.disabled) this.setValue(e)
      })
    },
    onDragStop (e) {
      this.dragging = false
      this.active = false
      this.$emit('dragStop', e)
    },
    handleDragMouseMove (e) {
      this.onDragUpdate(e)
    },
    handleTouchMove (e) {
      this.onDragUpdate(e.touches[0])
    },
    handleMouseEnd (e) {
      document.removeEventListener('mousemove', this.handleDragMouseMove)
      document.removeEventListener('mouseup', this.handleMouseEnd)
      this.onDragStop(e)
    }
  },
  watch: {
    value (v) {
      this.inputValue = v
    },
    inputValue (v) {
      this.$emit('input', v)
    }
  }
}
</script>

<style lang="stylus">
$primary = #0091EA
$lightPrimary = lighten($primary, 10)

.ui-slider
  width: 100%
  position: relative
  height: 24px
  margin: 18px 0 14px
  display: flex
  align-items: center
  cursor: default
  user-select:none
  outline: none
  &_label
    position absolute
    top 0
    margin-top -18px
    font-size 14px

.ui-slider_track
  position: absolute
  height: 2px
  left: 0
  right: 0
  top: 50%
  margin-top: -1px
  background-color: #aaa

.ui-slider_fill
  position: absolute
  height: 2px
  width: 100%
  left: 0
  top: 50%
  margin-top: -1px
  background-color: $primary
  .ui-slider.disabled &
    background-color: $lightPrimary

.ui-slider_thumb
  position: absolute
  top: 50%
  width: 14px
  height: 14px
  background-color: $primary
  color: $primary
  border-radius: 50%
  transform: translate(-50%, -50%)
  transition: background 250ms ease-out, border-color 250ms ease-out, width 250ms ease-in-out, height 250ms ease-in-out
  cursor: pointer
  .ui-slider.active &
    width: 20px
    height: 20px

  .ui-slider.zero &,
  .ui-slider.disabled &
    border: 2px solid #9fa8da
    background-color: #9fa8da
  .ui-slider.disabled &
    cursor: default

</style>
