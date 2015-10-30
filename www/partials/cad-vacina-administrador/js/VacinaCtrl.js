/**
 * Created by angelorobson on 25/10/15.
 */
(function () {

    'use strict';

    app.controller('VacinaCtrl', ['$scope', 'VacinaFactory', '$mdDialog', function ($scope, VacinaFactory, $mdDialog) {


        carregarVacinas();
        function carregarVacinas() {


            VacinaFactory.verTodas().then(function (resposta) {

                var vacinasCopy = angular.copy(resposta);

                $scope.vacinas = vacinasCopy;

            });
        }

        $scope.adicionarVacina = function (ev) {

            var vacina = '';

            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'partials/cad-vacina-administrador/salvar-vacina.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                resolve: {
                    vacina: function () {
                        return vacina;
                    }
                }
            })


        }


        $scope.remover = function (vacina) {

            VacinaFactory.remover(vacina).then(function (resposta) {

                if (resposta[0].resultado == 'OK') {

                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.body))
                            .title('Aviso!')
                            .content('Excluído com Sucesso!')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')
                    );

                    carregarVacinas();

                }

            });
        }


        $scope.editar = function (vacina, ev) {

            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'partials/cad-vacina-administrador/salvar-vacina.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                resolve: {
                    vacina: function () {
                        return vacina;
                    }
                }
            });

        }

        function DialogController($scope, $mdDialog, $location, VacinaFactory, vacina) {

            $scope.vacina = vacina;

            $scope.salvarVacina = function () {


                VacinaFactory.salvarVacina($scope.vacina).then(function (data) {

                    if (data == 'OK') {

                        $mdDialog.show(
                            $mdDialog.alert()
                                .parent(angular.element(document.body))
                                .title('Aviso!')
                                .content('Salvo com Sucesso!')
                                .ariaLabel('Alert Dialog Demo')
                                .ok('OK')
                        );

                        carregarVacinas();
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