'use strict';

function throttlePromises(limit, factories) {
  var completePromise = function (done) {
    var results = [];
    var inProgress = 0;
    var promise;

    var tryPromise = function (remain) {
      // console.log('Try with ' + remain.length + ' and ' + results.length);
      if (remain.length === 0) {
        done(results);
      } else {
        if (inProgress <= limit) {
          inProgress++;
          promise = remain[0];
          promise().then(function (result) {
            results.push(result);
            inProgress--;
            tryPromise(remain.slice(1));
          });

          tryPromise(remain);
        }
      }
    };

    tryPromise(factories);
  };

  return new Promise(function (done) {
    completePromise(done);
  });
}

module.exports = throttlePromises;
