/**
 * Created by angelorobson on 25/10/15.
 */
(function () {

    'use strict';

    app.controller('MapaTesteCtrl', ['$scope', 'MapaTesteFactory', '$rootScope', '$compile', function ($scope, MapaTesteFactory, $rootScope, $compile) {


        /*
        document.addEventListener("deviceready", function () {

            var mapDiv = document.getElementById("map_canvas");

            const GOOGLE = new plugin.google.maps.LatLng(37.422476, -122.08425);
            var map = plugin.google.maps.Map.getMap(mapDiv, {
                'camera': {
                    'latLng': GOOGLE,
                    'zoom': 17
                }
            });

            map.addEventListener(plugin.google.maps.event.MAP_READY, function () {

                map.addMarker({
                    'position': GOOGLE,
                    'title': "Hello GoogleMap for Cordova!"
                }, function (marker) {

                    marker.showInfoWindow();

                });

            });
        });
*/

        carregarLocalizacao();
        function carregarLocalizacao() {

            navigator.geolocation.getCurrentPosition(function (pos) {

                var myLatlng = new plugin.google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);


                document.addEventListener("deviceready", function () {

                    var mapDiv = document.getElementById("map_canvas");

                    var map = plugin.google.maps.Map.getMap(mapDiv, {
                        'camera': {
                            'latLng': myLatlng,
                            'zoom': 17
                        }
                    });


                    map.addEventListener(plugin.google.maps.event.MAP_READY, function () {

                        var content = "<div style='text: center;'><h4>EU</h4></div>";
                        var contentCompilad = $compile(content)($rootScope)

                        map.addMarker({
                            'position': myLatlng,
                            'title': "Este sou eu!!"
                        }, function (marker) {

                            marker.showInfoWindow();

                        });

                        var unidadesDeSaude =  JSON.parse(localStorage.getItem("ListaUnidadeDeSaude"));


                        angular.forEach(unidadesDeSaude, function(valor, item) {


                            var contentStringUnidadeDeSaude = "<div><h1>" + valor.nome +" </h1> <a href='' ng-click='detalhes("+item+")'>Detalhes...</a></div>";
                            var compiledUnidadeDeSaude = $compile(contentStringUnidadeDeSaude)($rootScope)




                            map.addMarker({
                                'position': new plugin.google.maps.LatLng(valor.latitude, valor.longitude),
                                'title': valor.nome,
                                'content': compiledUnidadeDeSaude[0]
                            }, function (marker) {

                                marker.showInfoWindow();

                            });



                        }, function (error) {
                            alert('Unable to get location: ' + error.message);
                        });





                    });


                    /*

                     var marker = new google.maps.Marker({
                     position: myLatlng,
                     map: map,
                     title: 'Eu!'
                     });


                     var content = "<div style='text: center;'><h4>EU</h4></div>";
                     var contentCompilad = $compile(content)($rootScope)



                     var infowindowEu = new google.maps.InfoWindow({
                     content: contentCompilad[0],

                     });

                     google.maps.event.addListener(marker, 'click', function() {
                     infowindowEu.open(map,marker);
                     });


                     var unidadesDeSaude =  JSON.parse(localStorage.getItem("ListaUnidadeDeSaude"));


                     angular.forEach(unidadesDeSaude, function(valor, item) {



                     var contentStringUnidadeDeSaude = "<div><h1>" + valor.nome +" </h1> <a href='' ng-click='detalhes("+item+")'>Detalhes...</a></div>";
                     var compiledUnidadeDeSaude = $compile(contentStringUnidadeDeSaude)($rootScope)



                     var infowindow = new google.maps.InfoWindow({
                     content: compiledUnidadeDeSaude[0],

                     });

                     var unidadeDeSaude = new google.maps.Marker({
                     position: new google.maps.LatLng(valor.latitude, valor.longitude),
                     //icon: 'img/marcador-mapa-eu.png',
                     map: map,
                     title: valor.nome
                     });
                     google.maps.event.addListener(unidadeDeSaude, 'click', function() {
                     infowindow.open(map,unidadeDeSaude);
                     });


                     }, function (error) {
                     alert('Unable to get location: ' + error.message);

                     });

                     */
                });

            });
        }


    }]);

}());




