/**
 * Created by angelo on 23/06/15.
 */
(function () {

	'use strict';


	app.controller('VerUnidadeDeSaudeNoMapaCtrl', ['$scope', '$rootScope',  '$compile', 'VerUnidadeDeSaudeNoMapaFactory', '$location', function ($scope, $rootScope, $compile, VerUnidadeDeSaudeNoMapaFactory, $location) {

		$rootScope.titulo = "Mapa";
		$rootScope.esconderMenu = false;

		$rootScope.mostrarMenuEscolhido = function() {

			$rootScope.tgState = false;

		}

		$rootScope.activetab = $location.path();

		VerUnidadeDeSaudeNoMapaFactory.carregarLocalizacao();


		$rootScope.detalhes = function () {


			$location.path('detalhes-unidade-de-saude');

		};



	}]);

}());