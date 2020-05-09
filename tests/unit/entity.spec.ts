import { Position, Entity, Board } from "../../src/entities";

describe("Position.ts", () => {
  it("calculates 7 is within 5 and 10", () => {
    const board = new Board();
    const entities = board.positions.map(pos => {
      return new Entity(pos, board, 100, 100, 100);
    });

    expect(entities[0].nearbyEnemies()).toBe(false);
  });
});
