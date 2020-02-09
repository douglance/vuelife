import { Position } from "../../src/entities";
import CONSTANTS from "../../src/constants";

describe("Position.ts", () => {
  const width = CONSTANTS.BOARDSIZE;

  it("calculates the correct positions for 1,1", () => {
    const position = new Position({ x: 1, y: 1 });
    expect(position.northCoords).toStrictEqual({ x: 1, y: width });
    expect(position.eastCoords).toStrictEqual({ x: 2, y: 1 });
    expect(position.southCoords).toStrictEqual({ x: 1, y: 2 });
    expect(position.westCoords).toStrictEqual({
      x: width,
      y: 1
    });
  });
  it("calculates the correct positions for 1,BOARDSIZE", () => {
    const position = new Position({ x: 1, y: width });
    expect(position.northCoords).toStrictEqual({
      x: 1,
      y: width - 1
    });
    expect(position.eastCoords).toStrictEqual({
      x: 2,
      y: width
    });
    expect(position.southCoords).toStrictEqual({ x: 1, y: 1 });
    expect(position.westCoords).toStrictEqual({
      x: width,
      y: width
    });
  });
  it("calculates the correct positions for BOARDSIZE,1", () => {
    const position = new Position({ x: width, y: 1 });
    expect(position.northCoords).toStrictEqual({
      x: width,
      y: width
    });
    expect(position.eastCoords).toStrictEqual({
      x: 1,
      y: 1
    });
    expect(position.southCoords).toStrictEqual({ x: width, y: 2 });
    expect(position.westCoords).toStrictEqual({
      x: width - 1,
      y: 1
    });
  });
  it("calculates the correct positions for BOARDSIZE,BOARDSIZE", () => {
    const position = new Position({ x: width, y: width });
    expect(position.northCoords).toStrictEqual({
      x: width,
      y: width - 1
    });
    expect(position.eastCoords).toStrictEqual({
      x: 1,
      y: width
    });
    expect(position.southCoords).toStrictEqual({ x: width, y: 1 });
    expect(position.westCoords).toStrictEqual({
      x: width - 1,
      y: width
    });
  });
});
