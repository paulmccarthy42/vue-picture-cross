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
        <div class="button" v-on:click="generateMap">Submit</div>
      </fieldset>
    </form>
    <div v-else>
      <h2>
        {{board.name}}
      </h2>
      <div v-for='cell in cells'>
        {{cell.x_position}}, {{cell.y_position}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
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
        console.log(numberOfCells)
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
    test: function () {
      console.log(this.board)
    }
  }
}
</script>

<style scoped>
  
</style>