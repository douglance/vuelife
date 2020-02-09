<template>
  <div id="app" class="grid">
    <div
      v-for="pos in board.positions"
      @click="board.tick()"
      :key="`tile-${pos.x}-${pos.y}`"
      :style="{
        'grid-column': `${pos.x}/${pos.x + 1}`,
        'grid-row': `${pos.y}/${pos.y + 1}`,
        width: '100%',
        height: '100%'
      }"
    >
      <Organism :entity="board.getEntityForPosition(pos)" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Organism from "./components/Organism.vue";
import { Board } from "./entities";
// import CONSTANTS from "./constants";

@Component({
  components: {
    Organism
  }
})
export default class App extends Vue {
  board = new Board();
}
</script>

<style>
.grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
}
</style>
