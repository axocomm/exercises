'use strict';

/**
 * Execute the given function only after the given `delay`
 * in milliseconds.
 *
 * @param {function} [fn]    the function to be delayed
 * @param {number}   [delay] the amount of time to wait
 *
 * @return {function} a function that will call `fn` only after
 *                    the given delay
 **/
function debounce(fn, delay) {
  var timeout;
  return function () {
    var that = this;
    var args = arguments;
    timeout && clearTimeout(timeout);
    timeout = setTimeout(function () {
      fn.apply(that, args);
      clearTimeout(timeout);
    }, delay);
  };
}

module.exports = debounce;
