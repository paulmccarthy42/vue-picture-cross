<template>
  <div id="app">
    Universal Header <a v-bind:href="'/#/'">that has access to scripts</a>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    test: function () {
      console.log('hello')
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
