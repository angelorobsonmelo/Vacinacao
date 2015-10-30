/**
 * Created by angelorobson on 25/10/15.
 */
(function () {

    'use strict';

    app.controller('ManualDoViajanteCtrl', ['$scope', 'ManualDoViajanteFactory', '$rootScope', '$location', function ($scope, ManualDoViajanteFactory, $rootScope, $location) {

        $rootScope.titulo = "Manual do Viajante";
        $rootScope.esconderMenu = false;

        $rootScope.activetab = $location.path();

        $rootScope.mostrarMenuEscolhido = function () {

            $rootScope.tgState = false;

        }

        $scope.regioes = [
            {'regiao': 'Nordeste', 'sequencial': 1},
            {'regiao': 'Sudeste', 'sequencial': 2},
            {'regiao': 'Centro-oeste', 'sequencial': 3},
            {'regiao': 'Sul', 'sequencial': 4},
            {'regiao': 'Norte', 'sequencial': 5},

        ];


        $scope.escolherRegiao = function () {


            ManualDoViajanteFactory.pesquisarVacinasDaRegiao($scope.regiao.sequencial).then(function (resposta) {

                var resultadoVacinasPorRegiaoCopy = angular.copy(resposta);

                $scope.resultadoVacinasPorRegiao = resultadoVacinasPorRegiaoCopy;

                console.log($scope.resultadoVacinasPorRegiao);


            });

        }


    }]);

}());

