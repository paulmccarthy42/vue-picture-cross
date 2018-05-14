<template>
  <div>
    <form v-if='puzzleDetailsViewable'>
      <fieldset>
        <legend>Puzzle Info</legend>
        <div>Title</div>
        <input type="text" name="title" v-model="board.name">
        <div>Dimensions</div>
        <select v-model='board.size'>
          <option>10</option>
          <option>12</option>
          <option>15</option>
        </select>
        <div class="button" v-on:click="generateMap()">Submit</div>
      </fieldset>
    </form>
    <div v-else>
      <h2>
        {{board.name}}
      </h2>
      <div class="puzzle">
        <div class='grid-10'> <!-- find a way to make this dynamic-->
          <div 
            v-for="cell in cells" 
            v-on:click="toggleDisplay(cell)"
            v-bind:class = "{ box : true, shaded : cell.filled }">
          </div>
        </div>
      </div>
      <div class="button" v-on:click="submitMap()">Submit</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewBoard',
  data () {
    return {
      cells: [],
      puzzleDetailsViewable: true,
      board: {
        diff: null,
        size: null,
        completed: false,
        name: null
      }
    }
  },
  methods: {
    generateMap: function () {
      if (this.board.name && this.board.size) {
        this.puzzleDetailsViewable = false
        var numberOfCells = parseInt(this.board.size) ** 2
        for (var i = 0; i < numberOfCells; i++) {
          this.cells.push(this.newCell(i % 10, parseInt(i / 10)))
        }
      } else {
        console.log('not ready')
      }
    },
    newCell: function (xPosition, yPosition) {
      return {
        x_position: xPosition,
        y_position: yPosition,
        filled: false
      }
    },
    toggleDisplay: function (cell) {
      this.cells.forEach(function (vueCell) {
        if (vueCell === cell) {
          vueCell.filled = !vueCell.filled
        }
      })
    }
  }
}
</script>

<style scoped>
.puzzle {
  padding-left: 33%;
  padding-right: 33%;
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
.grid-10 {
  width: 320px;
}
.grid-12 {
  width: 384px;
}
.grid-15 {
  width: 480;
}
.shaded {
  background-color: black;
  color: white;
}
</style>