/**
 * Created by angelo on 23/06/15.
 */
(function () {

	'use strict';


	app.factory('DetalhesFactory', ['$q', function ($q, $rootScope) {


		function pegarPontoDePartida() {

			var retorno = $q.defer();

			navigator.geolocation.getCurrentPosition(function (pos) {


				var origem = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude); // SETANDO NA VARIÁVEL ORIGEM A MINHA LOCALIZAÇÃO

				retorno.resolve(origem);

				localStorage.setItem('localizacao', angular.toJson(origem));

			}, function (error) {
				alert('Unable to get location: ' + error.message);
			});

			return retorno.promise;

		}


		return{
			pegarPontoDePartida: pegarPontoDePartida

		}

	}]);

}());