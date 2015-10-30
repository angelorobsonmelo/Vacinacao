/**
 * Created by angelorobson on 25/10/15.
 */
(function () {

    'use strict';

    app.controller('VacinaDoseIntervaloCtrl', ['$scope', 'VacinaDoseIntervaloFactory', 'VacinaFactory', 'IntervaloFactory', 'DoseFactory', '$mdDialog', function ($scope, VacinaDoseIntervaloFactory, VacinaFactory, IntervaloFactory, DoseFactory, $mdDialog) {


        function carregarVacinas() {

            VacinaFactory.verTodas().then(function (resposta) {

                var vacinasCopy = angular.copy(resposta);

                $scope.vacinas = vacinasCopy;


            });
        }

        carregarVacinas();

        $scope.verDosesEIntervalos = function (vacina, ev) {

            $mdDialog.show({
                controller: 'VerDetalhesVacinasDosesIntervaloCtrl',
                templateUrl: 'partials/vacina-dose-intervalo/ver-detalhes-vacina-dose-intervalo.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                resolve: {
                    vacina: function () {
                        return vacina;
                    }
                }
            })

        }


        $scope.adicionarVacinaDoseIntervalo = function (ev) {


            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'partials/vacina-dose-intervalo/salvar-vacina-dose-intervalo.html',
                parent: angular.element(document.body),
                targetEvent: ev,

            })
        }


        function DialogController($scope, $mdDialog, $location, VacinaFactory, DoseFactory, IntervaloFactory, VacinaDoseIntervaloFactory) {


            function carregarVacinas() {

                VacinaFactory.verTodas().then(function (resposta) {

                    var vacinasCopy = angular.copy(resposta);

                    $scope.vacinas = vacinasCopy;


                });
            }

            function carregarDoses() {

                DoseFactory.verTodas().then(function (resposta) {

                    var dosesCopy = angular.copy(resposta);

                    $scope.doses = dosesCopy;


                });
            }

            function carregarIntervalos() {

                IntervaloFactory.verTodas().then(function (resposta) {

                    var intervalosCopy = angular.copy(resposta);

                    $scope.intervalos = intervalosCopy;


                });

            }

            $scope.salvarVacinaDoseIntervalo = function () {

                VacinaDoseIntervaloFactory.salvar($scope);


            }



            carregarDoses();
            carregarIntervalos();
            carregarVacinas();


            $scope.hide = function () {
                $mdDialog.hide();
            };
            $scope.cancel = function () {
                $mdDialog.cancel();
            };
            $scope.answer = function (answer) {
                $mdDialog.hide(answer);
            };
        }


    }]);

}());