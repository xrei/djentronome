<template>
  <div class="container">
    <Metronome/>
  </div>
</template>

<script>
import Metronome from '../components/Metronome/Metronome.vue'

export default {
  components: {
    Metronome
  }
}

</script>

<style scoped lang="stylus">

.container
  max-width 768px
  margin 0 auto

</style>
