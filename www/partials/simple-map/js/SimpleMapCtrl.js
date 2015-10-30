/**
 * Created by angelo on 23/06/15.
 */
(function () {

	'use strict';



	app.controller('SimpleMapCtrl', ['$scope', '$rootScope',  '$compile', 'SimpleMapFactory', '$location', function ($scope, $rootScope, $compile, SimpleMapFactory, $location) {

		$rootScope.titulo = "Mapa";
		$rootScope.esconderMenu = false;


		SimpleMapFactory.carregarLocalizacao();

		$scope.detalhes = function() {

			alert("ok");
		}

		$rootScope.detalhes = function(indice) {
			
			var unidadesDeSaude =  JSON.parse(localStorage.getItem("ListaUnidadeDeSaude"));
			
			$rootScope.unidadeDeSaudeDetalhes = unidadesDeSaude[indice];
			$location.path('detalhes-unidade-de-saude');
//			$scope.map.getCenter();

		};




	}]);

}());