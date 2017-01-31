'use strict';

function throttlePromises(limit, factories) {
  var resolveThrottled = function (done) {
    var results = [];
    var inProgress = 0;
    var idx = 0;

    var resolved = function (i) {
      return function (result) {
        inProgress--;
        results[i] = result;
      };
    };

    var resolveNext = function () {
      if (idx >= factories.length && inProgress === 0) {
        done(results);
      } else if (idx < factories.length && inProgress < limit) {
        var i = idx++;
        var promiseFn = factories[i];

        inProgress++;
        promiseFn()
          .then(resolved(i))   // Decrement inProgress and add result
          .then(resolveNext);

        resolveNext();
      }
    };

    resolveNext();
  };

  return new Promise(resolveThrottled);
}

module.exports = throttlePromises;
