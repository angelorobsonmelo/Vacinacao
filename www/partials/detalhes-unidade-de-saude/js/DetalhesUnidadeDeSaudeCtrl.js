/**
 * Created by angelo on 23/06/15.
 */
(function () {

	'use strict';



	app.controller('DetalhesCtrl', ['$scope', '$rootScope', 'DetalhesFactory', '$location', function ($scope, $rootScope, DetalhesFactory, $location) {

		$rootScope.titulo = "Detalhes";
		$rootScope.esconderMenu = false;

		var carregarMeuLocal;

		$rootScope.unidadeDeSaudeDetalhes;


		DetalhesFactory.pegarPontoDePartida().then(function(data) {

			console.log(data);

			carregarMeuLocal = data;


		});


		$scope.verNoMapa = function(obj) {


			localStorage.setItem('unidadeDeSaude', angular.toJson(obj));


			$location.path('ver-unidade-de-saude-no-mapa');

		}

		$scope.tracarRota = function(obj) {

			localStorage.setItem('objParaRota', angular.toJson(obj));

			$location.path('rota/'+JSON.stringify(obj));

		}



	}]);

}());