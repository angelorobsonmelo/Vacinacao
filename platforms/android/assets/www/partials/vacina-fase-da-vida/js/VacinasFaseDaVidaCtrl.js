/**
 * Created by angelorobson on 25/10/15.
 */
(function () {

    'use strict';

    app.controller('VacinasFaseDaVidaCtrl', ['$scope', 'VacinasFaseDaVidaFactory', '$rootScope', '$location', function ($scope, VacinasFaseDaVidaFactory, $rootScope, $location) {


        $rootScope.titulo = "Vacinas por Fases da Vida";
        $rootScope.esconderMenu = false;

        $rootScope.activetab = $location.path();

        $rootScope.mostrarMenuEscolhido = function () {

            $rootScope.tgState = false;

        }


        $scope.fasesDaVida = [
            {'faseDaVida': 'Criança', 'sequencial': 1},
            {'faseDaVida': 'Adolescência', 'sequencial': 2},
            {'faseDaVida': 'Adulto', 'sequencial': 3},
            {'faseDaVida': 'Idoso', 'sequencial': 4},

        ];


        $scope.escolherFaseDaVida = function () {


            VacinasFaseDaVidaFactory.pesquisarVacinasPorFaseDaVida($scope.faseDaVida.sequencial).then(function (resposta) {

                var resultadoVacinasPorFaseDaVidaCopy = angular.copy(resposta);

                $scope.resultadoVacinasPorFaseDaVida = resultadoVacinasPorFaseDaVidaCopy;

                console.log($scope.resultadoVacinasPorFaseDaVida);


            });

        }


    }]);

}());