/**
 * Created by angelo on 23/06/15.
 */
(function () {

	'use strict';



	app.factory('RotaFactory', ['$q', function ($q, $rootScope) {


		var objRota;
		var longitude;

		function rota(resultsObj) {

			navigator.geolocation.getCurrentPosition(function (pos) {

				var myLatlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
				var mapOptions = {
						zoom: 14,
						center: myLatlng
				}




			}, function (error) {
				alert('Unable to get location: ' + error.message);
			});




			var rendererOptions = {
					draggable: true
			};


			var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);;
			var directionsService = new google.maps.DirectionsService();
			var map;


			var latitude =  JSON.parse(localStorage.getItem("latitude"));
			var longitude =  JSON.parse(localStorage.getItem("longitude"));


			var australia = new google.maps.LatLng(latitude, longitude);


			initialize();

			function initialize() {



				var mapOptions = {
						zoom: 7,
						center: australia
				};
				map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
				directionsDisplay.setMap(map);
				directionsDisplay.setPanel(document.getElementById('directionsPanel'));

				google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
					computeTotalDistance(directionsDisplay.getDirections());
				});

				calcRoute();
			}

			function calcRoute() {

				var latitude =  JSON.parse(localStorage.getItem("latitude"));
				var longitude =  JSON.parse(localStorage.getItem("longitude"));

				//var destino =  JSON.parse(localStorage.getItem("objParaRota"));

				console.log(resultsObj);

				var request = {
						origin: new google.maps.LatLng(latitude, longitude),
						destination: new google.maps.LatLng(resultsObj.latitude, resultsObj.longitude),
//						waypoints:[{location: 'Bourke, NSW'}, {location: 'Broken Hill, NSW'}],
						travelMode: google.maps.TravelMode.DRIVING
				};
				directionsService.route(request, function(response, status) {
					if (status == google.maps.DirectionsStatus.OK) {
						directionsDisplay.setDirections(response);
					}
				});
			}

			function computeTotalDistance(result) {
				var total = 0;
				var myroute = result.routes[0];
				for (var i = 0; i < myroute.legs.length; i++) {
					total += myroute.legs[i].distance.value;
				}
				total = total / 1000.0;
				document.getElementById('total').innerHTML = total + ' km';
			}

		}


		return{

			rota: rota

		}

	}]);

}());