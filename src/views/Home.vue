<template>
  <div class="">
    <Header/>
    <div class="container">
      <Metronome/>
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

.container
  width 768px
  margin 0 auto
  @media screen and (max-width: 767px)
    width auto
    height calc(100vh - 60px)

</style>
