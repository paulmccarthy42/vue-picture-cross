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
.shaded.filled {
  background-color: black;
  color: white;
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
