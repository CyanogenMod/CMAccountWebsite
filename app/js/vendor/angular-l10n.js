(function() {
  var module = angular.module('l10n', []);
  module.provider('l10n', function() {
    this.translations = {};

    this.add = function(localeCode, translations) {
      this.translations[localeCode] = translations;
    };

    this.$get = function($locale) {
      var localeCode = $locale.id;
      if (this.translations[localeCode]) {
        return this.translations[localeCode];
      } else {
        return {};
      }
    };
  });

  var getLocalizedString = function(key, l10n, fn) {
    var position;
    var remaining;
    var root = l10n;
    while ((position = key.indexOf('.')) > 0) {
      remaining = key.substr(position + 1);
      key = key.substr(0, position);
      if (typeof root[key] !== 'undefined') {
        root = root[key];
      } else {
        return null;
      }
      key = remaining;
    }
    value = root[key];
    return fn(value);
  };

  module.directive('l10nText', function(l10n) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var fn = function(value) {
          return element.text(value);
        };

        var key = attrs.l10nText;
        getLocalizedString(key, l10n, fn);
      }
    };
  });

  module.filter('l10n', function(l10n) {
    return function(original, key) {
      var fn = function(value) {
        return value;
      };

      var newValue = getLocalizedString(key, l10n, fn);
      if (newValue !== null) {
        return newValue;
      } else {
        return original;
      }
    };
  });
}).call(this);
