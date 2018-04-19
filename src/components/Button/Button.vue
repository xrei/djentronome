<template>

    <!-- v-ripple="{ ripple }" -->
  <button
    :class="classes"
    class="m_btn"
    @click="click"
  >
    <span class="m_btn-content">
      <slot/>
    </span>
  </button>
</template>

<script>

export default {
  name: 'AppButton',
  props: {
    type: {
      type: String,
      default: 'button'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    raised: {
      type: Boolean,
      default: false
    },
    floating: {
      type: Boolean,
      default: false
    },
    outline: {
      type: Boolean,
      default: false
    },
    primary: {
      type: Boolean,
      default: false
    },
    warn: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    ripple: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes () {
      return {
        'm_btn--active': !this.disabled,
        'm_btn--disabled': this.disabled,
        'm_btn--raised': this.raised,
        'm_btn--floating': this.floating,
        'm_btn--outline': this.outline,
        primary: this.primary,
        warn: this.warn,
        error: this.error
      }
    }
  },
  methods: {
    click (e) {
      !this.floating &&
        e.detail &&
        this.$el.blur()

      this.$emit('click', e)
    }
  }
}
</script>

<style lang="stylus">
$button-border-radius = 2px;
$button-height = 36px;
$button-min-width = 8rem;
$button-font-size = 18px;
$button-margin-y = .5rem;
$button-margin-x = 0;
$button-margin = $button-margin-y $button-margin-x;
$button-padding = 0 16px;

.m_btn{
  align-items: center;
  border-radius: $button-border-radius;
  border: 0;
  display: inline-flex;
  height: $button-height;
  flex: 0 1 auto;
  font-size: $button-font-size;
  font-weight: 400;
  justify-content: center;
  margin: $button-margin;
  min-width: $button-min-width;
  outline: 0;
  text-decoration: none;
  transition: .3s cubic-bezier(.25,.8,.25,1), color 1ms;
  position: relative;
  vertical-align: middle;
  cursor: pointer;
  a{
    text-decoration: none;
    color: inherit;
  }
}

.m_btn{
  &:focus, &:hover{
    .m_btn-content:before{
      background-color: currentColor
    }
  }

  &-content{
    align-items: center;
    display: flex;
    height: 100%;
    flex: 1 0 auto;
    justify-content: center;
    margin: 0 auto;
    padding: $button-padding;
    transition: .3s cubic-bezier(.25,.8,.25,1);
    white-space: nowrap;
    &:before{
      content: '';
      border-radius: inherit;
      color: inherit;
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      opacity: .15;
      transition: .3s cubic-bezier(.25,.8,.25,1);
      width: 100% ;
    }
  }
  &--raised{
    will-change: box-shadow;
    box-shadow: 0 1px 5px rgba(0,0,0, .2),
                0 2px 2px rgba(0,0,0, .14),
                0 3px 1px -2px rgba(0,0,0, .12);
  }
  &:active{
    box-shadow: 0 5px 5px -3px rgba(0,0,0,.2),
                0 8px 10px 1px rgba(0,0,0,.14),
                0 3px 14px 2px rgba(0,0,0,.12);
  }

  &--disabled{
    box-shadow: none!important;
    color: rgba(0,0,0,.30);
    background-color: rgba(0,0,0,.12)!important;
    pointer-events: none;
    opacity: .4;
  }

  &--outline{
    border: 1px solid currentColor;
    background: transparent !important;
    box-shadow: none;

    &:hover{
      box-shadow: none
    }
  }
}
</style>
