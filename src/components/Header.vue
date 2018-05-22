<template functional>
  <header class="header">
    <div class="h-inner">
      <span class="h-title">Djentronome</span>
    </div>
  </header>
</template>

<style lang="stylus" scoped>
.header
  width 100%
  height 60px
  padding 1rem
  background-color #000
  color #fff
  z-index 4
  .h-inner
    width 768px
    margin 0 auto
    @media screen and (max-width: 768px)
      width 100%
  .h-title
    font-size 28px
    line-height 28px
</style>
