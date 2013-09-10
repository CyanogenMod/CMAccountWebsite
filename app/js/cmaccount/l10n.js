(function() {
  window.locale = window.locale || {};
  locale.languages = [
    {             'code': 'cs', 'name': 'Czech'},
    {             'code': 'el', 'name': 'ελληνικά'},
    {'weight': 1, 'code': 'en', 'name': 'English'},
    {'weight': 4, 'code': 'es', 'name': 'Español'},
    {'weight': 5, 'code': 'fr', 'name': 'Français'},
    {             'code': 'hu', 'name': 'magyar nyelv'},
    {             'code': 'nl', 'name': 'Dutch'},
    {'weight': 3, 'code': 'pt', 'name': 'Português'},
    {             'code': 'sk', 'name': 'Slovenský'},
    {'weight': 2, 'code': 'zh-tw', 'name': '中文(正體字)'},
  ];
  locale.supported = _.pluck(locale.languages, 'code');
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
