/**
 * Created by angelorobson on 25/10/15.
 */
(function () {

    'use strict';

    app.controller('MapaTesteCtrl', ['$scope', 'MapaTesteFactory', function ($scope, MapaTesteFactory) {


        document.addEventListener("deviceready", function() {

            var mapDiv = document.getElementById("map_canvas");

            const GOOGLE = new plugin.google.maps.LatLng(37.422476,-122.08425);
            var map = plugin.google.maps.Map.getMap(mapDiv, {
                'camera': {
                    'latLng': GOOGLE,
                    'zoom': 17
                }
            });

            map.addEventListener(plugin.google.maps.event.MAP_READY, function() {

                map.addMarker({
                    'position': GOOGLE,
                    'title': "Hello GoogleMap for Cordova!"
                }, function(marker) {

                    marker.showInfoWindow();

                });

            });
        });


    }]);

}());