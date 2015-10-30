/**
 * Created by angelorobson on 25/10/15.
 */
(function () {

    'use strict';

    app.controller('DoseCtrl', ['$scope', 'DoseFactory', '$mdDialog', function ($scope, DoseFactory, $mdDialog) {


        carregarDoses();
        function carregarDoses() {


            DoseFactory.verTodas().then(function (resposta) {

                var DosesCopy = angular.copy(resposta);

                $scope.doses = DosesCopy;

            });
        }

        $scope.adicionarDose = function (ev) {

            var dose = '';

            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'partials/dose/salvar-dose.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                resolve: {
                    dose: function () {
                        return dose;
                    }
                }
            })


        }


        $scope.remover = function (vacina) {

            DoseFactory.remover(vacina).then(function (resposta) {

                if (resposta == 'OK') {

                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.body))
                            .title('Aviso!')
                            .content('Excluído com Sucesso!')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')
                    );

                    carregarDoses();

                }

            });
        }


        $scope.editar = function (dose, ev) {

            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'partials/dose/salvar-dose.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                resolve: {
                    dose: function () {
                        return dose;
                    }
                }
            });

        }

        function DialogController($scope, $mdDialog, $location, DoseFactory, dose) {

            $scope.dose = dose;

            $scope.salvarDose = function () {


                DoseFactory.salvarDose($scope.dose).then(function (data) {

                    if (data == 'OK') {

                        $mdDialog.show(
                            $mdDialog.alert()
                                .parent(angular.element(document.body))
                                .title('Aviso!')
                                .content('Salvo com Sucesso!')
                                .ariaLabel('Alert Dialog Demo')
                                .ok('OK')
                        );

                        carregarDoses();
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