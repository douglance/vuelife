const Numbers = {
  withinRange(min: number, max: number, target: number) {
    return (target - min) * (target - max) < 0;
  }
};

export default Numbers;
