<template>
  <div id="app">
    <HeartClicker />
  </div>
</template>

<script>
import HeartClicker from './components/HeartClicker';

export default {
  name: 'App',
  components: {
    HeartClicker
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
