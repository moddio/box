export default function (noa) {
  var intervals = [];

  return {
    name: "tick",

    order: 70,

    state: {
      // cylinder: false,
      // collideBits: 1 | 0,
      // collideMask: 1 | 0,
      // callback: null,
    },

    onAdd: null,

    onRemove: null,

    system: function entityCollider(dt, states) {
      emit("entityTick");
    },
  };
}
