import { Component } from './component';

class Attribute extends Component {
  constructor(parent) {
    super(parent);
    this.parent = parent;
    this.maxHp = 100;
    this.hp = this.maxHp;
  }

  recieveDamage(damage) {
    if (this.hp > 0) {
      this.hp = this.hp - damage;
      console.log(this.parent.id, 'recieve', damage, 'damage, total hp: ', this.hp);
      if (this.hp <= 0) {
        console.log(this.parent.id, 'is dead');
        this.parent.die();
      }
    }
  }

  recieveHeal(heal) {
    if (this.maxHp < this.hp + heal) this.hp = this.maxHp;
    else this.hp = this.hp + heal;
    console.log(this.parent.id, 'gain', heal, 'hp, total hp: ', this.hp);
  }

  tick() {}
}

export default Attribute;
