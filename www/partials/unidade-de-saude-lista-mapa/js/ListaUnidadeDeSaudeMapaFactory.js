/**
 * Created by angelo on 23/06/15.
 */
(function () {

    'use strict';



    app.factory('ListaUnidadeDeSaudeMapaFactory', ['$q', '$rootScope', '$compile', function ($q, $rootScope, $compile) {


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

						map.addMarker({
							'position': myLatlng,
							'title': "Este sou eu!!"
						}, function (marker) {

							marker.showInfoWindow();

						});

						var unidadesDeSaude = JSON.parse(localStorage.getItem("ListaUnidadeDeSaude"));


						angular.forEach(unidadesDeSaude, function (valor, item) {


							map.addMarker({
								'position': new plugin.google.maps.LatLng(valor.latitude, valor.longitude),
								'title': valor.nome,
								'snippet': "Click no balão apra mais detalhes",
								'markerClick': function (marker) {
									marker.showInfoWindow();
								},
								'infoClick': function () {

									$rootScope.unidadeDeSaudeDetalhes = valor;

									window.location = "index.html#/detalhes-unidade-de-saude";
								}

							});


						}, function (error) {
							alert('Unable to get location: ' + error.message);
						});


					});


				});

			});
		}




        return{

        	carregarLocalizacao: carregarLocalizacao
        }

    }]);

}());