/**
 * Created by angelorobson on 25/10/15.
 */
(function () {

    'use strict';

    app.controller('VisualizarCampanhaCtrl', ['$scope', '$rootScope', '$location', 'CampanhaFactory', function ($scope, $rootScope, $location, CampanhaFactory) {


        $rootScope.titulo = "Campanhas";
        $rootScope.esconderMenu = false;

        $rootScope.activetab = $location.path();

        $rootScope.mostrarMenuEscolhido = function () {

            $rootScope.tgState = false;

        }


        carregarCampanhas();

        function carregarCampanhas() {

            CampanhaFactory.consultarTodos().then(function (resposta) {

                var campanhasCopy = angular.copy(resposta);

                $scope.campanhas = campanhasCopy;


            });
        }

    }]);

}());