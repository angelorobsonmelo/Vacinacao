/**
 * Created by angelorobson on 25/10/15.
 */
(function () {

    'use strict';

    app.controller('VerDetalhesVacinasDosesIntervaloCtrl', ['$scope', 'VacinaFactory', 'vacina', '$mdDialog', 'VacinaDoseIntervaloFactory', function ($scope, VacinaFactory, vacina, $mdDialog, VacinaDoseIntervaloFactory) {


        $scope.vacina = vacina;

        carregarDosesEIntervalos(vacina);

        function carregarDosesEIntervalos(vacina) {

            VacinaDoseIntervaloFactory.verTodasPorSequencialVacina(vacina).then(function (resposta) {


                var vacinasDosesIntervalosCopy = angular.copy(resposta);

                $scope.vacinasDosesIntervalos = vacinasDosesIntervalosCopy;

            });
        }

        $scope.remover = function (vacinaDoseIntervalo) {


            console.log(vacinaDoseIntervalo);

            VacinaDoseIntervaloFactory.remover(vacinaDoseIntervalo).then(function (resposta) {


                if (resposta[0].resultado == 'OK') {

                    carregarDosesEIntervalos(vacina);


                }


            });


        }


        $scope.editar = function (vacinaDoseIntervalo, ev) {



            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'partials/vacina-dose-intervalo/editar-vacina-dose-intervalo.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                resolve: {
                    vacinaDoseIntervalo: function () {
                        return vacinaDoseIntervalo;
                    }
                }

            })


        }


        function DialogController($scope, $mdDialog, $location, VacinaFactory, DoseFactory, IntervaloFactory, VacinaDoseIntervaloFactory, vacinaDoseIntervalo) {

            $scope.vacina = vacinaDoseIntervalo.vacinaVO;

            $scope.dadosParaSeremEditado = vacinaDoseIntervalo;


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

            $scope.editarVacinaDoseIntervalo = function () {

                VacinaDoseIntervaloFactory.editar($scope, vacinaDoseIntervalo);


            }



            carregarDoses();
            carregarIntervalos();



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


        $scope.cancel = function () {
            $mdDialog.cancel();
        };


    }]);

}());