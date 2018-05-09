<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{size}} puzzle, {{completed ? 'previously' : 'never'}} completed</h2>
    <div class='puzzle'>
      <div class='row' v-for="row in cells">
        <div class="count">
          {{countFilled(row)}}
        </div>
        <div class="box" 
          v-for="cell in row" 
          v-bind:class = "{ shaded : cell.shownFilled, filled : cell.filled }" 
          v-on:click="toggleDisplay(cell)">
        </div>
        <br></br>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data () {
    return {
      msg: 'Component specific header',
      cells: [],
      size: null,
      completed: null
    }
  },
  mounted: function () {
    var that = this
    axios.get('http://localhost:3000/v1/boards/1')
      .then(function (response) {
        that.cells = response.data.cells
        that.size = response.data.size
        that.completed = response.data.completed
        console.log(that.cells)
      })
      .catch(function (error) { console.log(error) })
  },
  methods: {
    toggleDisplay: function (cell) {
      this.cells.forEach(function (row) {
        row.forEach(function (vueCell) {
          if (vueCell === cell) {
            vueCell.shownFilled = !vueCell.shownFilled
          }
        })
      })
    },
    countFilled: function (row) {
      var count = [0]
      row.forEach(function (cell) {
        if (cell.filled) {
          count[count.length - 1] += 1
        } else {
          count.push(0)
        }
      })
      var cleanCount = count.filter(function (num) { return num !== 0 })
      if (cleanCount.length > 0) {
        console.log(cleanCount)
        return cleanCount.join(' ')
      } else {
        return 0
      }
    }
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

.box {
  border: 1px black solid;
  height: 30px;
  width: 30px;
  float: left;
}
.row {
  min-width: 330px;
  height: 32px;
}
.puzzle {
  padding-left: 33%;
  padding-right: 33%;
}
.shaded.filled {
  background-color: black;
}
.shaded {
  background-color: red;
}
.count {
  min-width: 100px;
  float: left;
  text-align: right;
  color: grey;
  padding-right: 5px;
  border-top: 1px grey solid;
}

</style>
