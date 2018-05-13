<template>
  <div>
    <h1>{{ msg }}</h1>
    <h2>{{size}} by {{size}} puzzle, {{completed ? 'previously' : 'never'}} completed</h2>
    <div class='puzzle'>
      <div class="top">
        <div class='counts-top'>
          <div class="cornerstone">div</div>
          <div v-for='x in Array.apply(null, Array(size)).map(function (_, i) {return i;})' class='count'>
            {{countFilled(column(x), true)}}
          </div>
          <br>
        </div> 
      </div>
      <div class="body">
      <div class='counts-left'>
        <div v-for='x in Array.apply(null, Array(size)).map(function (_, i) {return i;})' class='count'>
          {{countFilled(row(x))}}
          </div>
        </div> 
      </div>
      <div class="grid">
        <div 
          v-for="cell in cells" 
          v-bind:class = "{ box : true, shaded : cell.shownFilled, filled : cell.filled }" 
          v-on:click="toggleDisplay(cell)">
        </div>
      </div>
    </div> 
    <button v-on:click="checkComplete(row(0))">check if first column complete</button>
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
      this.cells.forEach(function (vueCell) {
        if (vueCell === cell) {
          vueCell.shownFilled = !vueCell.shownFilled
        }
      })
    },
    row: function (rowNumber) {
      return this.cells.filter(function (cell) {
        return cell.x_position === rowNumber
      })
    },
    column: function (columnNumber) {
      return this.cells.filter(function (cell) {
        return cell.y_position === columnNumber
      })
    },
    countFilled: function (groupOfCells, column = false) {
      var count = [0]
      groupOfCells.forEach(function (cell) {
        if (cell.filled) {
          count[count.length - 1] += 1
        } else {
          count.push(0)
        }
      })
      var cleanCount = count.filter(function (num) { return num !== 0 })
      if (cleanCount.length > 0) {
        return (column ? cleanCount.join("\n") : cleanCount.join(' '))
      } else {
        return 0
      }
    },
    checkComplete: function (groupOfCells) {
      var count = [0]
      groupOfCells.forEach(function (cell) {
        if (cell['shownFilled']) {
          count[count.length - 1] += 1
        } else {
          count.push(0)
        }
      })
      var cleanCount = count.filter(function (num) { return num !== 0 })
      if (cleanCount.length > 0) {
        console.log(cleanCount.join(' ') === this.countFilled(this.row(0)))
      } else {
        console.log(0)
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
.grid {
  width: 450px;
}
.shaded.filled {
  background-color: black;
}
.shaded {
  background-color: red;
}
.counts-left {
  float: left;
}
.counts-top {
  /*float: none;*/
  /*padding-left: 100px;*/
}
.counts-top .cornerstone {
  min-width: 105px;
  float: left;
}
.count {
  text-align: right;
  color: grey;
}
.counts-left .count {
  height: 30px;
  border-top: 1px grey solid;
  border-bottom: 1px grey solid;
  min-width: 100px;
  padding-right: 5px;
}
.counts-top .count {
  width: 30px;
  padding-bottom: 5px;
  height: 50px;
  float: left;
  border-left: 1px grey solid;
  border-right: 1px grey solid;
}
.count.completed {
  background-color: lightgrey;
}
.top {
  width: 100%;
}

</style>
