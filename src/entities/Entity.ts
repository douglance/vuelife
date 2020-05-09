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
  red: number;
  green: number;
  blue: number;

  color: string;

  constructor(
    position: Position,
    board: Board,
    red?: number,
    blue?: number,
    green?: number
  ) {
    const random = () => Math.round(Math.random() * 255);
    this.position = position;
    this.board = board;
    this.energy = random();
    this.age = 0;
    this.power = random();
    this.dna = Math.random()
      .toString(36)
      .substring(7);
    this.direction = Math.round(Math.random() * 3);
    this.red = red ?? Math.random() * 255;
    this.blue = blue ?? Math.random() * 255;
    this.green = green ?? Math.random() * 255;
    this.color = `RGB(${this.red}, ${this.green}, ${this.blue})`;
  }

  tick() {
    setInterval(this.takeAction.bind(this), 100);
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

  shouldRest() {
    return this.energy < 5;
  }
  shouldEat() {
    return this.position.resources > 0;
  }
  shouldAttack() {
    return this.nearbyEnemies() && this.power > 100;
  }
  shouldDefend() {
    return this.nearbyEnemies() && this.energy < 100;
  }
  shouldMate() {
    return this.energy > 10;
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
      } else if (this.power > this.targetEntity.power) {
        this.targetEntity.energy -= 2;
        if (this.targetEntity.energy < 0) {
          this.convert(this.targetEntity);
        }
      }
    }
  }

  convert(entity: Entity) {
    entity.dna = this.dna;
    entity.color = this.color;
    entity.power = this.power;
  }

  defend() {
    this.energy -= 1;
  }

  mate() {
    this.energy -= 1;
    if (this.targetEntity) {
      if (
        this.targetEntity.getAction() === ACTIONS.MATE &&
        this.compatibleMate(this.targetEntity)
      ) {
        this.power += 1;
        this.targetEntity.power += 1;
        this.age = 0;
        this.targetEntity.age = 0;
      }
    }
  }

  get targetEntity(): Entity | undefined {
    return this.board.getEntityForCoords(this.facingCoords(this.direction));
  }

  facingCoords(direction: Direction): Coords {
    switch (direction) {
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

  nearbyEnemies() {
    const surroundingCoords = [
      this.facingCoords(Direction.NORTH),
      this.facingCoords(Direction.EAST),
      this.facingCoords(Direction.SOUTH),
      this.facingCoords(Direction.WEST)
    ];
    let enemies = true;
    surroundingCoords.forEach(coords => {
      const otherEntity = this.board.getEntityForCoords(coords);
      console.log(otherEntity);
      if (otherEntity && this.compatibleMate(otherEntity)) {
        enemies = false;
      } else {
        enemies = true;
      }
    });
    return enemies;
  }

  compatibleMate(targetEntity: Entity) {
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
