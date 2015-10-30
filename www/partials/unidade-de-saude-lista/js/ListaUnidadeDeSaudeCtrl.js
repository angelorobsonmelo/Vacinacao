/**
 * Created by angelo on 23/06/15.
 */
(function () {

	'use strict';

	app.controller('UnidadeDeSaudeListaCtrl', ['$scope', 'UnidadeDeSaudeListaFactory', '$rootScope', '$location', '$window', function ($scope, UnidadeDeSaudeListaFactory, $rootScope, $location, $window) {
		$scope.unidadesDeSaudesFront = '';
		
		$rootScope.activetab = $location.path();

		$rootScope.mostrarMenuEscolhido = function() {

			$rootScope.tgState = false;

		}

		$rootScope.esconderHeader = false;
		$rootScope.titulo = 'Lista de Unidade de Saúde';
		 
		
		var array;
		
		
		carregarLista();
		function carregarLista(){

		//UnidadeDeSaudeListaFactory.pegarMinhalocalizacao();


			var listaDeUnidadesDeSaude = JSON.parse(localStorage.getItem("ListaUnidadeDeSaude"));


			$scope.unidadesDeSaudesFront = listaDeUnidadesDeSaude;


		}

		$scope.verNoMapa = function(obj) {

			localStorage.setItem('unidadeDeSaude', angular.toJson(obj));

			$rootScope.unidadeDeSaudeDetalhes = obj;

			$location.path('ver-unidade-de-saude-no-mapa');

		}

		$scope.tracarRota = function(obj) {

			localStorage.setItem('objParaRota', angular.toJson(obj));

			$location.path('rota/'+JSON.stringify(obj));

		}





	}]);

}());