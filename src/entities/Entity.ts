import { Coords, Direction, Position, ACTIONS, Board } from ".";
import Numbers from "../utils/numbers";

export class Entity {
  position: Position;
  board: Board;
  direction: Direction;

  energy: number;
  age: number;
  power: number;
  dna: string;
  red = Math.random() * 255;
  green = Math.random() * 255;
  blue = Math.random() * 255;

  color = `RGB(${this.red}, ${this.green}, ${this.blue})`;

  constructor(position: Position, board: Board) {
    const random = () => Math.round(Math.random() * 25);
    this.position = position;
    this.board = board;
    this.energy = random();
    this.age = 0;
    this.power = random();
    this.dna = Math.random()
      .toString(36)
      .substring(7);
    this.direction = Math.round(Math.random() * 3);
  }

  tick() {
    setInterval(this.takeAction.bind(this), 100);
  }

  shouldRest() {
    return this.energy < 5;
  }
  shouldEat() {
    return this.position.resources > 0;
  }
  shouldAttack() {
    return this.power > 0;
  }
  shouldDefend() {
    return this.energy < this.power;
  }
  shouldMate() {
    return this.energy > 10;
  }

  getAction(): ACTIONS {
    if (this.shouldRest()) {
      return ACTIONS.REST;
    }
    if (this.shouldEat()) {
      return ACTIONS.EAT;
    }
    if (this.shouldAttack()) {
      return ACTIONS.ATTACK;
    }
    if (this.shouldDefend()) {
      return ACTIONS.DEFEND;
    }
    if (this.shouldMate()) {
      return ACTIONS.MATE;
    }
    return ACTIONS.REST;
  }

  takeAction() {
    switch (this.getAction()) {
      case ACTIONS.REST:
        this.rest();
        break;
      case ACTIONS.EAT:
        this.eat();
        break;
      case ACTIONS.ATTACK:
        this.attack();
        break;
      case ACTIONS.DEFEND:
        this.defend();
        break;
      case ACTIONS.MATE:
        this.mate();
        break;
    }
  }

  convert(entity: Entity) {
    entity.dna = this.dna;
    entity.color = this.color;
  }

  eat() {
    const resources = Math.round(this.position.resources / 2);
    this.energy = this.energy + resources;
    this.position.resources = this.position.resources - resources;
  }

  rest() {
    this.energy += 1;
    this.direction = Math.round(Math.random() * 3);
  }

  attack() {
    this.energy -= 1;
    if (this.targetEntity) {
      if (this.targetEntity.getAction() === ACTIONS.DEFEND) {
        return;
      } else {
        this.targetEntity.energy -= 2;
        if (this.targetEntity.energy < 0) {
          this.convert(this.targetEntity);
        }
      }
    }
  }

  defend() {
    this.energy -= 1;
  }

  mate() {
    this.energy -= 1;
    if (this.targetEntity) {
      if (
        this.targetEntity.getAction() === ACTIONS.MATE &&
        this.compareColors(this.targetEntity)
      ) {
        this.power += 1;
        this.targetEntity.power += 1;
      }
    }
  }

  get targetEntity(): Entity | undefined {
    return this.board.getEntityForCoords(this.facingCoords);
  }

  get facingCoords(): Coords {
    switch (this.direction) {
      case Direction.NORTH:
        return this.position.northCoords;
      case Direction.EAST:
        return this.position.eastCoords;
      case Direction.SOUTH:
        return this.position.southCoords;
      case Direction.WEST:
        return this.position.westCoords;
    }
  }

  compareColors(targetEntity: Entity) {
    const range = 50;
    return (
      Numbers.withinRange(
        this.red - range,
        this.red + range,
        targetEntity.red
      ) &&
      Numbers.withinRange(
        this.blue - range,
        this.blue + range,
        targetEntity.blue
      ) &&
      Numbers.withinRange(
        this.green - range,
        this.green + range,
        targetEntity.green
      )
    );
  }
}
