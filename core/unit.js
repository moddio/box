class Unit {
  constructor(engine, body) {
    this.engine = engine;

    // create entity in noa
    let ent = this.engine.noa.createEntity("idont know how this works?!~");
    ent.category = "unit";

    this.body = this.createBody();
    this.rotation = 0;
    this.ownerPlayer = undefined;
  }

  createBody() {
    // create actual physical body
    let body = this.engine.noa.createBody("idont know how this works?!~");
    return body;
  }

  moveBall() {
    this.body.applyImpulse([1, 0, 7]);
  }

  getOwner() {
    return this.ownerPlayer;
  }

  setOwner(player) {
    this.ownerPlayer = player;
  }

  tick() {
    if (isClient && this.getOwner().isMe) {
      let current = noa.camera.getDirection()[0];
      let persistanceRot = 0.01;
      if (current > 0 && this.rotation !== current) {
        this.body.rotatePOV(0, persistanceRot + 0.01, 0);
      }
      if (current < 0 && this.rotation !== current) {
        this.body.rotatePOV(0, -persistanceRot - 0.01, 0);
      }
      this.rotation = current;
    }
  }
}

export default Unit;
