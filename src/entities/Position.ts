import CONSTANTS from "../constants";
import { Coords } from ".";

export class Position {
  x: number;
  y: number;

  resources: number = this.generateRandomResourceAmount();

  constructor(coords: Coords) {
    this.x = coords.x;
    this.y = coords.y;
  }

  get northCoords() {
    if (1 < this.y && this.y <= CONSTANTS.BOARDSIZE) {
      return { x: this.x, y: this.y - 1 };
    } else {
      return { x: this.x, y: CONSTANTS.BOARDSIZE };
    }
  }

  get eastCoords() {
    if (1 <= this.x && this.x < CONSTANTS.BOARDSIZE) {
      return { x: this.x + 1, y: this.y };
    } else {
      return { x: 1, y: this.y };
    }
  }

  get southCoords() {
    if (CONSTANTS.BOARDSIZE > this.y && this.y >= 1) {
      return { x: this.x, y: this.y + 1 };
    } else {
      return { x: this.x, y: 1 };
    }
  }

  get westCoords() {
    if (this.x > 1 && this.x <= CONSTANTS.BOARDSIZE) {
      return { x: this.x - 1, y: this.y };
    } else {
      return { x: CONSTANTS.BOARDSIZE, y: this.y };
    }
  }

  generateRandomResourceAmount() {
    return Math.round(Math.random() * 15);
  }
}
