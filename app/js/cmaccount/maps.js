(function() {
  // Create a class to make map interaction cleaner
  function GoogleMap(element) {
    var self = this;

    // Private members
    var _element = element;
    var _mapOptions = {
      zoom: 3,
      center: new google.maps.LatLng(40, -100),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var _map = new google.maps.Map(_element, _mapOptions);
    var _marker = null;
    var _circle = null;
    var _defaultZoom = 17;
    var _lastPosition = null;
    var _accuracy = null;

    // Public members
    this.zoom = _map.getZoom();
    this.center = _map.getCenter();
    this.userInteracted = false;
    
    // Public methods
    this.updateMarker = function(latitude, longitude) {
      var _position = new google.maps.LatLng(latitude, longitude);
      if (!_marker) {
        _marker = new google.maps.Marker({
          position: _position,
          map: _map,
          animation: google.maps.Animation.DROP,
          icon: '/static/img/marker_sprite.png'
        });

        // We created a new marker, so zoom in and center.
        _map.setCenter(_position);
        _map.setZoom(_defaultZoom);
      } else {
        _lastPosition = _marker.getPosition();
        _marker.setPosition(_position);
      }
    };

    this.updateCircle = function(latitude, longitude, accuracy) {
      _accuracy = accuracy;
      var _position = new google.maps.LatLng(latitude, longitude);
      if (!_circle) {
        _circle = new google.maps.Circle({
          strokeColor: '#33b5e5',
          strokeOpacity: 0.7,
          strokeWeight: 2,
          fillColor: '#33b5e5',
          fillOpacity: 0.2,
          map: _map,
          center: _position,
          radius: accuracy
        });
      } else {
        _circle.setCenter(_position);
        _circle.setRadius(accuracy);
      }
    };

    this.resetZoom = function(zoom) {
      if (_accuracy < 10) {
        _map.setZoom(_defaultZoom + 2);
      } else if (_accuracy < 20) {
        _map.setZoom(_defaultZoom + 1);
      } else {
        _map.setZoom(_defaultZoom);
      }
    };

    this.fitCircle = function() {
      // If the user has interacted with the map, don't do anything.
      if (self.userInteracted) {
        return;
      }

      // Reset the zoom.
      self.resetZoom();

      // If the bounds do not contain the location, recenter.
      if (!_map.getBounds().contains(_marker.getPosition())) {
        _map.setCenter(_marker.getPosition());
        _map.setZoom(_defaultZoom);
      }

      // If the circle is outside the map bounds, zoom/center to fit it.
      var hasNE = _map.getBounds().contains(_circle.getBounds().getNorthEast());
      var hasSW = _map.getBounds().contains(_circle.getBounds().getSouthWest());
      if (!hasNE || !hasSW) {
        _map.fitBounds(_circle.getBounds());
      }
    };

    this.redraw = function() {
      google.maps.event.trigger(_map, 'resize');
    };

    // Listeners
    google.maps.event.addListener(_map, "zoom_changed", function() {
      self.zoom = _map.getZoom();
      self.center = _map.getCenter();
    });

    google.maps.event.addListener(_map, "center_changed", function() {
      self.center = _map.getCenter();
    });

    $(_map.getDiv()).on('click', function() {
      self.userInteracted = true;
    });

  }

  angular.module('cmaccount.maps', []).directive('googleMap', [function() {
    return {
      restrict: 'AE',
      template: '<div></div>',
      link: function(scope, element, attrs) {
        // Add the class so the width/height is correct.
        angular.element(element[0]).addClass('google-map');

        // Initialize the map
        var map = new GoogleMap(element[0]);

        // Add the map to the scope
        scope.map = map;
      }
    };
  }]);
})();
