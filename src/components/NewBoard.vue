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
      } else {
        console.log('not ready')
      }
    },
    newCell: function () {
      return {
        id: 0,
        x_position: 0,
        y_position: 0,
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