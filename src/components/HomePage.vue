<template>
  <div>
    <h2>
      Picture Cross Home Page
    </h2>
    <div v-for='board in boards'>
      <a v-bind:href='"#/boards/" + board.id'>{{board.name}}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data () {
    return {
      boards: []
    }
  },
  mounted: function () {
    var that = this
    axios.get('http://localhost:3000/v1/boards/')
      .then(function (response) {
        that.boards = response.data
        console.log(that.boards)
      })
      .catch(function (error) { console.log(error) })
  },
  methods: {
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
