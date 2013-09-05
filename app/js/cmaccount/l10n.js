(function() {
  window.locale = window.locale || {};
  locale.supported = [
    'cs',
    'el',
    'en',
    'es',
    'fr',
    'hu',
    'nl',
    'pt',
    'sk',
    'zh-tw'
  ];

  locale.getBestSupported = function() {
    var bestWeight = -1;
    var bestLocale = undefined;
    _.each(locale.accept, function(v,k) {
      if (v > bestWeight) {
        bestWeight = v;
        bestLocale = k;
      }
    });

    if (_.contains(locale.supported, bestLocale)) {
      return bestLocale;
    } else {
      if (bestLocale !== undefined) {
        var languageOnly = bestLocale.split("-")[0];
        if (_.contains(locale.supported, languageOnly)) {
          return languageOnly;
        }
      }
    }

    return undefined;
  };
  
  var localeModules = _.map(locale.supported, function(locale) {
    return 'cmaccount.l10n.' + locale;
  });
  
  var localesModule = angular.module('cmaccount.l10n', localeModules);
}).call(this);
