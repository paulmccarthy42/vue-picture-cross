<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <li v-for="x in test">{{x}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data () {
    return {
      msg: 'Component specific header',
      test: {}
    }
  },
  mounted: function () {
    var that = this
    axios.get('http://localhost:3000/v1/boards/1')
      .then(function (response) {
        console.log(response.data)
        console.log(that)
        that.test = response.data
      })
      .catch(function (error) { console.log(error) })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
