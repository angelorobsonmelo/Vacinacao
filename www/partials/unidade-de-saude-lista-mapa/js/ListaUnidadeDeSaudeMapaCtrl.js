/**
 * Created by angelo on 23/06/15.
 */
(function () {

	'use strict';



	app.controller('ListaUnidadeDeSaudeMapaCtrl', ['$scope', '$rootScope',  '$compile', 'ListaUnidadeDeSaudeMapaFactory', '$location', function ($scope, $rootScope, $compile, ListaUnidadeDeSaudeMapaFactory, $location) {

		$rootScope.titulo = "Mapa";
		$rootScope.esconderMenu = false;

		$rootScope.activetab = $location.path();
		
		$rootScope.mostrarMenuEscolhido = function() {

			$rootScope.tgState = false;

		}


		ListaUnidadeDeSaudeMapaFactory.carregarLocalizacao();

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