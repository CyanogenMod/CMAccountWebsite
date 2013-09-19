var directivesModule = angular.module('cmaccount.directives', []);

directivesModule.directive('match', function() {
  return {
    require: 'ngModel',
    link: function(scope, elem, attrs, ctrl) {
      var otherInput = elem.inheritedData("$formController")[attrs.match];

      ctrl.$parsers.push(function(value) {
        ctrl.$setValidity("match", value === otherInput.$viewValue);
        return value;
      });

      otherInput.$parsers.push(function(value) {
        ctrl.$setValidity("match", value === ctrl.$viewValue);
        return value;
      });
    }
  };
});

directivesModule.directive('passwordComplexity', function() {
  return {
    require: 'ngModel',
    link: function(scope, elem, attrs, ctrl) {
      elem.bind('input', function(event) {
        var meetsComplexityRequirements = elem.val().length >= 8;
        scope.$apply(function() {
            ctrl.$setValidity('complexity', meetsComplexityRequirements);
        });
      });
    }
  };
});

directivesModule.directive('available', function(Account) {
  return {
    require: 'ngModel',
    link: function(scope, elem, attrs, ctrl) {
      elem.bind('blur', function() {
        scope.$apply(function() {
          var viewValue = elem.val();

          if (viewValue !== "" && typeof viewValue !== "undefined") {
            params = {};
            params[attrs.available] = viewValue;

            Account.available(params, function(data) {
              ctrl.$setValidity('available', data[attrs.available]);
              ctrl.$setValidity('checking', true);
            });
          }
        });
      });

      ctrl.$parsers.push(function(viewValue) {
        ctrl.$setValidity('available', true);

        if (ctrl.$valid) {
          ctrl.$setValidity('checking', false);
        }

        return viewValue;
      });
    }
  };
});

directivesModule.directive('preventDefault', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.bind('click', function(event) {
        event.preventDefault();
      });
    }
  };
});

directivesModule.directive('focus', function() {
  return function(scope, element) {
    element[0].focus();
  };
});

directivesModule.directive('required', function($timeout) {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, model) {
      // Listen for events to trigger input on form element
      // Use timeout to ensure val is populated before triggering 'input'
      // - 'change' event fires for Chrome
      // - 'DOMAttrModified' fires for Firefox 22.0
      // - 'keydown' for Safari 6.0.1
      // - 'propertychange' for IE
      element.on('change.autofill DOMAttrModified.autofill keydown.autofill properchange.autofill', function(e) {
        $timeout(function() {
          if (element.val() !== '') {
            element.trigger('input');
          }
        }, 0);
      });
    }
  };
});

directivesModule.directive('bsNavbar', function($location) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs, controller) {
      scope.$watch(function() {
        return $location.path();
      }, function(newValue, oldValue) {
        angular.element('li[data-match-route]', element).each(function(k, li) {
          var $li = angular.element(li), pattern = $li.attr('data-match-route'), regexp = new RegExp('^' + pattern + '$', ['i']);
          if (regexp.test(newValue)) {
            $li.addClass('active').find('.collapse.in').collapse('hide');
          } else {
            $li.removeClass('active');
          }
        });
      });
    }
  };
});

directivesModule.directive('matchLocale', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs, controller) {
      scope.$watch(function() {
        return scope.locale.current;
      }, function(newValue, oldValue) {
        var liLocale = attrs.matchLocale;
        if (scope.locale.current == liLocale) {
          element.addClass('active');
        } else {
          element.removeClass('active');
        }
      });
    }
  };
});

directivesModule.directive('cmTooltip', function($parse, $compile) {
  return {
    restrict: 'A',
    scope: true,
    link: function(scope, element, attrs, ctrl) {
      var getter = $parse(attrs.cmTooltip);
      var setter = getter.assign;
      var value = getter(scope);

      scope.$watch(attrs.cmTooltip, function(newValue, oldValue) {
        value = newValue;
      });

      if (!!attrs.unique) {
        element.on('show', function(ev) {
          $('.tooltip.in').each(function() {
            var $this = $(this);
            var tooltip = $this.data('tooltip');
            if (tooltip && !tooltip.$element.is(element)) {
              $this.tooltip('hide');
            }
          });
        });
      }

      element.tooltip({
        title: function() { return angular.isFunction(value) ? value.apply(null, arguments) : value; },
        html: true
      });
    }
  };
});
