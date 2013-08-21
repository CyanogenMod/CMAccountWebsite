window.cmid = {};

(function(_) {
  var cmid = window.cmid || {};

  function Storage() {
    this.supported = false;
    var self = this;

    var getFutureDate = function(minutes) {
      var currentTime = new Date();
      var futureTime = new Date();
      futureTime.setTime(currentTime.getTime() + (minutes*60*1000));
      return futureTime.getTime();
    };

    // Check to see if localstorage is supported.
    try {
      if ('localStorage' in window && window.localStorage !== null) {
        self.supported = true;
      }
    } catch(e) {
      self.supported = false;
    }

    this.set = function(key, value, expiration) {
      if (!self.supported) return null;
      localStorage.removeItem(key);

      if (!expiration) {
        expiration = null;
      } else {
        expiration = getFutureDate(expiration);
      }

      var storedValue = {
        expiration: expiration,
        value: value
      };

      localStorage.setItem(key, JSON.stringify(storedValue));
    };

    this.get = function(key) {
      if (!self.supported) return null;

      var storedValue = localStorage.getItem(key);
      if (storedValue) {
        storedValue = JSON.parse(storedValue);
        var currentTime = (new Date()).getTime();
        if (storedValue.expiration && currentTime >= storedValue.expiration) {
          localStorage.removeItem(key);
          return null;
        } else {
          return storedValue.value;
        }
      } else {
        return null;
      }
    };
  }

  _.extend(cmid, {
    Storage: new Storage()
  });

})(_);
