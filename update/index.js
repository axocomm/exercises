'use strict';

var Commands = {
  $push: function (target, item) {
    return target.concat(item);
  },

  $set: function (target, key, value) {
    target[key] = value;
    return target;
  }
};

function update(state, updates) {
  return Commands.$push(state, updates);
}

console.log(update([1], [2]));
console.log(Commands.$set({abc: 'def'}, 'abc', 'fgh'));

module.exports = update;
