var engine = BOX.Engine;

engine.start();

// create my own unit by default
engine.myPlayer = engine.addEntity({
        type: "Player",
        isHuman: true,
        name: "john",
    });

engine.myPlayer.createUnit();

