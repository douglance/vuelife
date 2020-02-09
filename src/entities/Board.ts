import { Position, Entity, Coords, ACTIONS } from ".";
import CONSTANTS from "../constants";

export class Board {
  positions: Position[];
  entities: Entity[];
  turn = 0;

  width = CONSTANTS.BOARDSIZE;
  height = CONSTANTS.BOARDSIZE;

  constructor() {
    console.log("Generating Tiles");
    const positions = [];
    const entities = [];
    const count = CONSTANTS.BOARDSIZE + 1;
    for (let i = 1; i < count; i++) {
      for (let j = 1; j < count; j++) {
        const pos = new Position({ x: i, y: j });
        positions.push(pos);
        const entity = new Entity(pos, this);
        entities.push(entity);
      }
    }
    this.entities = entities;
    this.positions = positions;
  }

  getRandomPosition(): Position {
    return this.positions[Math.floor(Math.random() * this.positions.length)];
  }

  getEntityForPosition(pos: Position): Entity | undefined {
    return this.entities.find(entity => {
      return entity?.position === pos;
    });
  }

  getEntityForCoords(coords: Coords): Entity | undefined {
    const pos = this.getPositionForCoords(coords);
    return this.entities.find(entity => {
      return entity?.position === pos;
    });
  }

  getPositionForCoords(coords: Coords): Position | undefined {
    return this.positions.find(pos => {
      return this.comparePositions(pos, coords);
    });
  }

  comparePositions(pos1: Position, pos2: Coords): boolean {
    return pos1.x === pos2.x && pos1.y === pos2.y;
  }

  getFacingEntity(entity: Entity): Entity | undefined {
    const facing = entity.facingCoords;
    const pos = this.getPositionForCoords(facing);
    if (pos) {
      return this.getEntityForPosition(pos);
    }
  }

  doBattle(entityOne: Entity, entityTwo: Entity): void {
    if (entityOne.power > entityTwo.power) {
      const index = this.entities.findIndex(ent => {
        return ent.dna === entityTwo.dna;
      });
      entityOne.power -= CONSTANTS.RATE;
      entityOne.energy -= CONSTANTS.RATE;
      this.entities[index].dna = entityOne.dna;
      this.entities[index].color = entityOne.color;
    }
  }

  mate(entities: Entity[]) {
    entities
      .filter(ent => ent.energy > CONSTANTS.RATE)
      .forEach(ent => {
        ent.power += CONSTANTS.RATE;
        ent.energy -= CONSTANTS.RATE;
        ent.age = 0;
      });
  }

  updateEntities() {
    this.turn++;
    console.log(this.turn);
    const randomPos = this.getRandomPosition();
    randomPos.resources = randomPos.generateRandomResourceAmount();
    this.entities.forEach(entity => {
      entity.takeAction();
      entity.age++;
    });
  }

  tick() {
    setInterval(this.updateEntities.bind(this), 100);
  }
}
