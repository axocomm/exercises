'use strict';

var Commands = {
  $push: function (item) {
    return this.concat(item);
  },

  $set: function (item) {
    return item;
  }
};

function d(msg) {
  console.log('=== ' + msg);
}

/**
 * Determine if the given object is a state update command.
 *
 * @param {object} [update] the current update
 *
 * @return {boolean} if the "node" is a command
 */
function isCommand(update) {
  var keys = Object.keys(update);
  return keys.length === 1 && keys[0] in Commands;
}

/**
 * Apply an update to the given state.
 *
 * @param {any}    [state]  the state
 * @param {object} [update] the update to perform
 *
 * @return {any} the transformed state
 */
function applyUpdate(update, state) {
  var k = Object.keys(update)[0];
  var arg = update[k];
  var commandFn = Commands[k];

  d('State is ' + JSON.stringify(state));
  d('Update is ' + JSON.stringify(update));
  d('Arg is ' + JSON.stringify(arg));

  if (typeof commandFn === 'undefined') {
    throw("Invalid command '" + k + "'");
  }

  return commandFn.call(state, arg);
}

/**
 * Perform updates on the given state.
 *
 * Utilizes a helper function to recursively call itself
 * for all keys in `state` until a command ("leaf") node is
 * found, at which point the transformation is applied to the
 * current location in `state`.
 *
 * @param {any}    [state]   the initial state
 * @param {object} [updates] the intended updates
 *
 * @return {any} the state after transformation
 */
function update(state, updates) {
  var helper = function (s, u) {
    if (isCommand(u)) {
      return applyUpdate(u, s);
    }
  };

  return helper(state, updates);
}

var state = [1, 2];
var updates = {$push: [3]};
console.log(update(state, updates));

module.exports = update;
