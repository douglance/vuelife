<template>
  <div
    :style="
      `background-color:${color}; width:100%; height:100%; text-align: center; border: 1px dashed black;`
    "
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <fa icon="arrow-up" class="arrow" v-if="direction === DIRECTION.NORTH" />
    <fa icon="arrow-right" class="arrow" v-if="direction === DIRECTION.EAST" />
    <fa icon="arrow-down" class="arrow" v-if="direction === DIRECTION.SOUTH" />
    <fa icon="arrow-left" class="arrow" v-if="direction === DIRECTION.WEST" />
    <span>{{ entity.dna }}</span>
    <div style="font-size:24px;">
      <p v-if="entity.getAction() === ACTIONS.REST">😴</p>
      <p v-if="entity.getAction() === ACTIONS.ATTACK">👊</p>
      <p v-if="entity.getAction() === ACTIONS.DEFENSE">🙌</p>
      <p v-if="entity.getAction() === ACTIONS.EAT">🍉</p>
      <p v-if="entity.getAction() === ACTIONS.MATE">🍆</p>
    </div>
    <div v-if="hover" class="floating">
      <div>
        ( {{ pos.x }} / {{ pos.y }} )
        <!-- <p>{{ pos.northCoords }}</p>
        <p>{{ pos.westCoords }} + {{ pos.eastCoords }}</p>
        <p>{{ pos.southCoords }}</p> -->
      </div>
      <ul>
        <li>DNA: {{ entity.dna }}</li>
        <li>POWER: {{ entity.power }}</li>
        <li>AGE: {{ entity.age }}</li>
        <li>ENERGY: {{ entity.energy }}</li>
        <li>RSRCS: {{ entity.position.resources }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Entity, Direction, ACTIONS } from "../entities";

@Component({})
export default class Organism extends Vue {
  @Prop(Entity) entity!: Entity;

  pos = this.entity.position;
  ACTIONS = ACTIONS;

  hover = false;

  DIRECTION = Direction;

  get direction() {
    return this.entity?.direction ?? 0;
  }

  get color() {
    return this.entity?.color ?? `RGB(0,0,0)`;
  }
}
</script>

<style scoped>
.arrow {
  width: 20%;
  height: 20%;
}
.floating {
  position: absolute;
  text-align: center;
  font-size: 11px;
  background-color: RGBA(0, 0, 0, 0.5);
  color: white;
  border: 1px white solid;
  float: right;
}
</style>
