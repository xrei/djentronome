<template>
  <div class="fw">
    <Header/>
    <div class="container">
      <Metronome/>
    </div>
    <div class="author-cont">
      <a href="https://github.com/xrei/">&copy; Rei</a>
      <a href="https://github.com/xrei/djentronome" title="Github">Source code</a>
    </div>
  </div>
</template>

<script>
import Metronome from '../components/Metronome/Metronome.vue'
import Header from '../components/Header.vue'

export default {
  components: {
    Metronome, Header
  }
}

</script>

<style scoped lang="stylus">

.fw
  position relative
  display flex
  flex-flow column
  height 100%
  align-items center

.container
  flex 1
  display flex
  @media screen and (max-width: 767px)
    width auto
    // height calc(100vh - 60px)

.author-cont
  display inline-flex
  // position absolute
  margin-bottom 2rem
  a
    font-weight 500
    margin-right 1.5rem
    color #9e9e9e
    &:last-child
      margin 0
</style>
