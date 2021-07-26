class Player extends Entity{
    constructor() {
        
        // add client's control for my player only
        if (global.isClient && engine.myPlayer == this) {
            this.addComponent("controlComponent")
        } else { // all server players have controlComponent
            this.addComponent("controlComponent")
        }
    }

    setMainUnit(unit) {
        this.mainUnit = unit;
    }

    getMainUnit() {
        return this.mainUnit;
    }

}