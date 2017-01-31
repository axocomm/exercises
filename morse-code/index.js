'use strict';

var codes = require('./codes');

function transmitter(options, callback) {
  var getState = function (code) {
    return code.split('').map(function (d) {
      return d === '.' ? '1' : '111';
    });
  };

  var getCode = function (c) {
    return options.codes[c];
  };

  var toMorse = function (str) {
    var words = str.split(/  */);
    return words.map(function (word) {
      var letters = word.split('');
      return letters.map(function (l) {
        var states = getState(getCode(l));
        return states.join('0');
      }).join('000');
    }).join('0000000');
  };

  return toMorse(options.message);
}

console.log(transmitter({
  codes: codes,
  message: 'so so'
}, null));

module.exports = transmitter;
