var engine = BOX.Engine;

engine.start();
engine.engineStep();

// USE THIS ON DEBUG MODE ONLY NOT IN PRODUCTION
global.BOX = BOX;

// create my own unit by default
engine.myPlayer = engine.addEntity({
  type: "Player",
  isHuman: true,
  name: "john",
});

engine.myPlayer.createUnit();
