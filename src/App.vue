<template>
  <div id="app">
    <app-header></app-header>
    <app-list v-if="state"></app-list>
    <app-note v-else :note="note"></app-note>
  </div>
</template>

<script>
import { eventBus } from './main'
import { mapActions } from 'vuex'
import appHeader from './components/Header'
import appList from './components/List'
import appNote from './components/Note'
export default {
  data() {
    return {
      componentId: 'appList',
      note: ''
    }
  },
  computed: {
    state() {
      return this.$store.state.engage
    }
  },
  watch: {
    state() {
      this.clearAll();
    }
  },
  components: {
    appList,
    appHeader,
    appNote
  },
  methods: {
    ...mapActions(['clearAll'])
  },
  created() {
    eventBus.$on('openNote', e => {
      this.note = e;
      this.componentId = 'appNote'
      this.$store.state.engage = false
      })
  },
}
</script>

<style>

</style>
