(function() {
  var DEBUG = 0;
  var INFO = 1;
  var WARNING = 2;
  var ERROR = 3;

  var _Logging = function(level) {
    this.logs = [];
    this.level = level;
    var self = this;

    var log = function() {
      var level = arguments[0];
      var message = Array.prototype.slice.call(arguments[1]);
      var messageWithLevel = message;

      switch (level) {
        case DEBUG:
          messageWithLevel.unshift("DEBUG:");
          break;
        case INFO:
          messageWithLevel.unshift("INFO:");
          break;
        case WARNING:
          messageWithLevel.unshift("WARN:");
          break;
        case ERROR:
          messageWithLevel.unshift("ERROR:");
          break;
      }
     
      var method = console.log;
      if (level == WARNING) {
        method = console.warn;
      } else if (level == ERROR) {
        method = console.error;
      }

      if (level >= self.level) {
        if (!method.apply) {
          console.log(messageWithLevel);
        } else {
          method.apply(console, messageWithLevel);
        }
      } else {
        self.logs.push({level: level, message: message});
        if (self.logs.length > 50) {
          self.logs = self.logs.slice(-50);
        }
      }
    };

    this.debug = function() {
      log(DEBUG, arguments);
    };

    this.info = function() {
      log(INFO, arguments);
    };

    this.warn = function() {
      log(WARNING, arguments);
    };

    this.error = function() {
      log(ERROR, arguments);
    };

    this.setLogLevel = function(level) {
      if (this.level == level) {
        return;
      }
      
      this.level = level;

      // Reprint any logs that were missed
      var skippedLogs = [];
      for (var i=0, l = this.logs.length; i < l; i++) {
        if (this.logs[i].level >= level) {
          log(this.logs[i].level, this.logs[i].message);
        } else {
          console.log("Skipping: ", this.logs[i]);
          skippedLogs.push(this.logs[i]);
        }
      }
      this.logs = skippedLogs;
    };
  };

  window.Logging = {
    init: function(level) {
      window.logging = new _Logging(level);
    },
    DEBUG: DEBUG,
    INFO: INFO,
    WARNING: WARNING,
    ERROR: ERROR
  };

  // Handle shitty browsers
  var noop = function() {};

  // If window.console does not exist, noop that shit.
  if (!window.console) {
    window.console = {
      log: noop,
      warn: noop,
      error: noop
    };
  } else {
    // If we have console.log, but not console.warn, redirect to console.log
    if (!console.warn && console.log) {
      console.warn = console.log;
    }
   
    // If we have console.log, but not console.error, redirect to console.log
    if (!console.error && console.log) {
      console.error = console.log;
    }

    // Finally, if we don't have console.log, noop everything.
    if (!console.log) {
      console.log = noop;
      console.warn = noop;
      console.error = noop;
    }
  }
})();

if (window.location.hostname == "account.cyanogenmod.org") {
  Logging.init(Logging.INFO);
} else {
  Logging.init(Logging.DEBUG);
}
