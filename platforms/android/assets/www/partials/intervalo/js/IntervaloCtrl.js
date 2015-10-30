/**
 * Created by angelorobson on 25/10/15.
 */
(function () {

    'use strict';

    app.controller('IntervaloCtrl', ['$scope', 'IntervaloFactory', '$mdDialog', function ($scope, IntervaloFactory, $mdDialog) {


        carregarIntervalos();
        function carregarIntervalos() {


            IntervaloFactory.verTodas().then(function (resposta) {

                var intervalosCopy = angular.copy(resposta);

                $scope.intervalos = intervalosCopy;

            });
        }

        $scope.adicionarIntervalo = function (ev) {

            var intervalo = '';

            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'partials/intervalo/salvar-intervalo.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                resolve: {
                    intervalo: function () {
                        return intervalo;
                    }
                }
            })


        }


        $scope.remover = function (intervalo) {

            IntervaloFactory.remover(intervalo).then(function (resposta) {

                if (resposta == 'OK') {

                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.body))
                            .title('Aviso!')
                            .content('Excluído com Sucesso!')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')
                    );

                    carregarIntervalos();

                }

            });
        }


        $scope.editar = function (intervalo, ev) {

            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'partials/intervalo/salvar-intervalo.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                resolve: {
                    intervalo: function () {
                        return intervalo;
                    }
                }
            });

        }

        function DialogController($scope, $mdDialog, $location, IntervaloFactory, intervalo) {

            $scope.intervalo = intervalo;

            $scope.salvarIntervalo = function () {


                IntervaloFactory.salvarIntervalo($scope.intervalo).then(function (data) {

                    if (data == 'OK') {

                        $mdDialog.show(
                            $mdDialog.alert()
                                .parent(angular.element(document.body))
                                .title('Aviso!')
                                .content('Salvo com Sucesso!')
                                .ariaLabel('Alert Dialog Demo')
                                .ok('OK')
                        );

                        carregarIntervalos();
                        $mdDialog.hide();
                    }

                });


            }

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