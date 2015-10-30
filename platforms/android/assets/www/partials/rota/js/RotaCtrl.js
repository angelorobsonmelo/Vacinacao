/**
 * Created by angelo on 23/06/15.
 */
(function () {

	'use strict';



	app.controller('RotaCtrl', ['$scope', '$rootScope',  '$compile', 'RotaFactory', '$location', '$routeParams', function ($scope, $rootScope, $compile, RotaFactory, $location, $routeParams) {

		$rootScope.titulo = "Rota";
		$rootScope.esconderMenu = false;


		var resultsObj = angular.fromJson($routeParams.obj);

		//console.log(resultsObj);

		RotaFactory.rota(resultsObj);





	}]);

}());