<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style lang="stylus">

*
  box-sizing border-box
  margin 0
  padding 0
  &:before, &:after
    box-sizing: inherit

html, body
  width 100%
  height 100%

body
  color #212121
  background #fff
  line-height 1.5
  background-color #eee
  font-family 'Open Sans', Arial, Helvetica,sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale

.flex-row
  display flex
  flex-flow row
.flex-col
  display flex
  flex-flow column
.flex-center
  justify-content center
  align-items center
</style>
