'use strict';

function throttlePromises(limit, factories) {
  var resolveThrottled = function (done) {
    var results = [];
    var inProgress = 0;
    var idx = 0;

    var resolveNext = function () {
      if (idx >= factories.length && inProgress === 0) {
        done(results);
      } else if (idx < factories.length && inProgress < limit) {
        var i = idx++;
        var promiseFn = factories[i];

        inProgress++;
        promiseFn()
          .then(function (result) {
            inProgress--;
            results[i] = result;
            resolveNext();
          });

        resolveNext();
      }
    };

    resolveNext();
  };

  return new Promise(resolveThrottled);
}

module.exports = throttlePromises;
