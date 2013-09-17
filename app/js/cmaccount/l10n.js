(function() {
  window.locale = window.locale || {};
  locale.languages = [
    {             'code': 'cs', 'name': 'Czech'},
    {             'code': 'el', 'name': 'ελληνικά'},
    {'weight': 1, 'code': 'en', 'name': 'English'},
    {'weight': 5, 'code': 'es', 'name': 'Español'},
    {'weight': 4, 'code': 'fr', 'name': 'Français'},
    {             'code': 'hu', 'name': 'magyar nyelv'},
    {             'code': 'it', 'name': 'Italiano'},
    {             'code': 'nl', 'name': 'Dutch'},
    {             'code': 'pl', 'name': 'Polski'},
    {'weight': 3, 'code': 'pt', 'name': 'Português'},
    {'weight': 2, 'code': 'ru', 'name': 'Pусский'},
    {             'code': 'sk', 'name': 'Slovenský'},
    {             'code': 'zh-tw', 'name': '中文(正體字)'},
    {             'code': 'ja', 'name': '日本語'},
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

  locale.set = function(code) {
    locale.current = code;
    localStorage.setItem('locale', JSON.stringify({locale: code}));
    $scope.$digest();
    //location.reload();
  };

  locale.showInFooter = 5;
  locale.current = locale.getBestSupported();
  
  var localeModules = _.map(locale.supported, function(locale) {
    return 'cmaccount.l10n.' + locale;
  });
  
  var localesModule = angular.module('cmaccount.l10n', localeModules);
}).call(this);
