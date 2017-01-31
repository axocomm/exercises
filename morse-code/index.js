'use strict';

var codes = require('./codes');

var Spaces = {
  STATE: '0',
  LETTER: '000',
  WORD: '0000000'
};

function transmitter(options, callback) {
  var getStates = function (code) {
    return code.split('').map(function (d) {
      return d === '.' ? '1' : '111';
    });
  };

  var getCode = function (c) {
    return options.codes[c];
  };

  var toMorse = function (str) {
    return str
      .split(/  */)
      .map(function (word) {
        return word
          .split('')
          .map(function (l) {
            var states = getStates(getCode(l));
            return states.join(Spaces.STATE);
          })
          .join(Spaces.LETTER);
      })
      .join(Spaces.WORD);
  };

  return toMorse(options.message);
}

console.log(transmitter({
  codes: codes,
  message: 'so so'
}, null));

module.exports = transmitter;
