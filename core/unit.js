class Unit {
  constructor(noa, body) {
    this.noa = noa;
    this.body = body;
  }

  moveBall() {
    this.body.applyImpulse([1, 0, 7]);
  }
}

export default Unit;
