import Numbers from "../../src/utils/numbers";

describe("Position.ts", () => {
  it("calculates 7 is within 5 and 10", () => {
    const min = 5;
    const max = 10;
    const target = 7;
    expect(Numbers.withinRange(min, max, target)).toBe(true);
  });
  it("calculates 11 is not within 5 and 10", () => {
    const min = 5;
    const max = 10;
    const target = 11;
    expect(Numbers.withinRange(min, max, target)).toBe(false);
  });
});
