<template>
  <div>
    <h1>{{ msg }}</h1>
    <h2>{{size}} by {{size}} puzzle, {{completed ? 'previously' : 'never'}} completed</h2>
    <div class='puzzle'>
      <div class="top">
        <div class='counts-top'>
          <div class="cornerstone">X</div>
          <div 
          v-for='x in Array.apply(null, Array(size)).map(function (_, i) {return i;})' 
          v-bind:class='{count: true, completed: sectionComplete(column(x))}'>
            {{countCheck(column(x), 'filled')}}
          </div>
          <br>
        </div> 
      </div>
      <div class="body">
      <div class='counts-left'>
        <div 
        v-for='x in Array.apply(null, Array(size)).map(function (_, i) {return i;})' 
        v-bind:class="{ count: true, completed: sectionComplete(row(x))}">
          {{countCheck(row(x), 'filled')}}
          </div>
        </div> 
      </div>
      <div class="grid">
        <div 
          v-for="cell in cells" 
          v-bind:class = "{ box : true, shaded : cell.shownFilled }" 
          v-on:click="toggleDisplay(cell)">
          {{cell.x_position}}, {{cell.y_position}}
        </div>
      </div>
    </div> 
    <!-- <button v-on:click="sectionComplete(row(0))">check if first column complete</button> -->
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
    var id = this.$root.$route.params.id
    var that = this
    axios.get('http://localhost:3000/v1/boards/' + id)
      .then(function (response) {
        that.cells = response.data.cells
        that.size = response.data.size
        that.completed = response.data.completed
        that.msg = response.data.name
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
    countCheck: function (groupOfCells, typeOfCheck) {
      var count = [0]
      groupOfCells.forEach(function (cell) {
        if (cell[typeOfCheck]) {
          count[count.length - 1] += 1
        } else {
          count.push(0)
        }
      })
      var cleanCount = count.filter(function (num) { return num !== 0 })
      if (cleanCount.length > 0) {
        return cleanCount.join(' ')
      } else {
        return 0
      }
    },
    sectionComplete: function (groupOfCells) {
      return this.countCheck(groupOfCells, 'filled') === this.countCheck(groupOfCells, 'shownFilled')
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
.shaded {
  background-color: black;
  color: white;
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
