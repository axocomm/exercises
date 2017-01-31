'use strict';

var codes = require('./codes');

var Spaces = {
  STATE: '0',
  LETTER: '000',
  WORD: '0000000'
};

var States = {
  DOT: '1',
  DASH: '111'
};

function transmitter(options, callback) {
  var getStates = function (code) {
    return code.split('').map(function (d) {
      return d === '.' ? States.DOT : States.DASH;
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

  var transmit = function (morse) {
    var helper = function (remain, curState) {
      if (remain.length === 0) {
        options.toggle();
        return callback();
      }

      var state = remain[0];
      if (state !== curState) {
        options.toggle();
      }

      options.timeouter(function () {
        helper(remain.slice(1), state);
      }, 1);
    };

    helper(morse);
  };

  var states = toMorse(options.message);
  return transmit(states);
}

module.exports = transmitter;
