<template>
  <div
    class="text-input-container"
    :class="[classes]"
    @click="focus()">
    <label>
      <slot/>
    </label>

    <slot name="input">
      <input
        class="text-field-input"
        ref="input"
        :type="type"
        :step="step"
        :min="min"
        :max="max"
        :placeholder="placeholder"
        :required="required"
        :value="value"
        @input="onInput"
        @focus="focus()"
        @blur="blur()"
      >
    </slot>
    <div class="text-field-details"/>
  </div>
</template>

<script>
export default {
  name: 'MaterialInput',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    step: {
      type: Number,
      default: 0
    },
    min: Number,
    max: Number,
    required: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      isFocused: false,
      valid: true,
      inpVal: this.value
    }
  },
  methods: {
    onInput (e) {
      this.inpVal = e.target.value

      if (this.max && this.inpVal >= this.max) {
        this.inpVal = this.max
      }
      if (this.min && this.inpVal <= this.min) {
        this.inpVal = this.min
      }

      this.handleValidation()
      this.$emit('input', this.inpVal)
    },
    handleValidation () {
      this.valid = this.$el ? this.$refs.input.validity.valid : this.valid
    },
    blur (e) {
      this.handleValidation()
      this.$nextTick(() => (this.isFocused = false))
      this.$emit('blur', e)
    },
    focus (e) {
      this.isFocused = true
      this.$refs.input.focus()
      this.$emit('focus', e)
    }
  },
  computed: {
    classes () {
      return {
        'input-focused': this.isFocused,
        'input-has-value': Boolean(this.inpVal || (this.placeholder && !this.inpVal)),
        'input-has-errors': Boolean(!this.valid)
      }
    }
  },
  mounted () {
    this.autofocus && this.focus()
  }
}
</script>

<style lang="stylus" scoped>
$red-color = #ff3d00
$transp = #757575
$def-color = #4285f4

$input-size = 28px

$swift-ease-out-duration = .5s !default
$swift-ease-out-timing-function = cubic-bezier(.30, .8, .30, 1) !default
$swift-ease-out = all $swift-ease-out-duration $swift-ease-out-timing-function !default

.text-input-container
  width: 100%
  min-height: 48px
  margin-bottom: 1.25rem
  padding-top: 1.375rem
  display: flex
  position: relative
  flex-direction: column
  color: inherit

  > label
    position: absolute
    font-weight 500
    top: 22px
    width: 100%
    height: $input-size - 4px
    line-height: $input-size - 4px
    text-align: left
    pointer-events: none
    transition: $swift-ease-out
    transition-property: color, font ,transform
    transition-duration: .3s
    color: $transp
    font-size: 16px

.input-focused, .input-has-value
  label
    transform: translateY(-20px)
    transform-origin: bottom left
    font-size: 14px
    color: $def-color
  .text-field-details
    &:after, &:before
      background-color: $def-color
      opacity: 1
      z-index: 1

.text-field-input
  color inherit
  display: block
  position: relative
  font-size: 1.125rem
  // width: 100%
  height: $input-size
  line-height: $input-size
  outline: none
  border: none
  background: none
  border-radius: 0
  box-shadow: none
  padding: 0 0 0 .25rem
  margin: 0

.text-field-details
  display: flex
  justify-content: space-between
  position: relative
  overflow: hidden
  width: 100%
  height: 1px

  &:before
    height: 1px
    position: absolute
    width: 100%
    top: 0
    left: 0
    background-color: rgba(4, 4,4, .4)
    transition: .15s background-color cubic-bezier(.35, 0, .55, .2)
    content: ""
  &:after
    height: 1px
    position: absolute
    right: 0
    top: 0
    left: 0
    background-color: rgba(4, 4,4, .4)
    opacity: 0
    transition: .15s background-color cubic-bezier(.35, 0, .55, .2)
    content: ""

.error-msg
  position absolute
  bottom -1rem
  color: $red-color
  font-size: 14px
  line-height: 14px
  overflow: hidden
  margin-top: 0
  padding: 6px 0 0

.input-has-errors
  .text-field-details
    &:after
      opacity: 1
      background-color: $red-color
    &:before
      opacity: 0
      background-color: $red-color

.__ui_input-fade-enter-active, .__ui_input-fade-leave-active
  transition: opacity .3s cubic-bezier(.3, 0, .55, .82)

.__ui_input-fade-enter, .__ui_input-fade-leave-to
  opacity: 0
</style>
