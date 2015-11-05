/**
 * Created by angelorobson on 25/10/15.
 */

/**
 * Created by angelorobson on 25/10/15.
 */
(function () {

    'use strict';

    app.factory('VacinaDoseIntervaloFactory', ['$http', '$q', '$mdDialog', function ($http, $q, $mdDialog) {


        function verTodas() {

            var retorno = $q.defer();

            window.plugins.spinnerDialog.show("vacinação","Carregando...", false);

            $http.get('http://192.168.0.20:8080/Vacinacao/rest/vacina_dose_intervalo/listarTodas')
                .success(function (resposta) {


                    retorno.resolve(resposta);

                    console.log(resposta);

                    window.plugins.spinnerDialog.hide();

                })
                .error(function (data, status) {

                    window.plugins.spinnerDialog.hide();

                    console.log(data);
                    alert(status)

                })

            return retorno.promise;


        }


        function verTodasPorSequencialVacina(vacina) {

            window.plugins.spinnerDialog.show("vacinação","Carregando...", false);

            var retorno = $q.defer();

            $http.get('http://192.168.0.20:8080/Vacinacao/rest/vacina_dose_intervalo/listarTodasPorSequencialVacina/' + vacina.sequencial)
                .success(function (resposta) {


                    retorno.resolve(resposta);

                    console.log(resposta);

                    window.plugins.spinnerDialog.hide();

                })
                .error(function (data, status) {

                    window.plugins.spinnerDialog.hide();

                    console.log(data);
                    alert(status)

                })


            return retorno.promise;


        }

        function salvar($scope) {

            window.plugins.spinnerDialog.show("vacinação","Carregando...", false);

            var retorno = $q.defer();


            var objetosToJson = function () {

                return angular.toJson({

                    "vacinaVO": {"sequencial": $scope.vacina.sequencial},
                    "doseVO": {"sequencial": $scope.dose.sequencial},
                    "intervaloVO": {"sequencial": $scope.intervalo.sequencial}

                })

            }

            $http.post('http://192.168.0.20:8080/Vacinacao/rest/vacina_dose_intervalo/salvar', objetosToJson())
                .success(function (resposta) {


                    retorno.resolve(resposta);

                    if (resposta[0].resultado == 'OK') {

                        alert("Salvo com sucesso!");


                    }

                })
                .error(function (data, status) {

                    window.plugins.spinnerDialog.hide();

                    console.log(data);
                    alert(status)

                })

            return retorno.promise;


        }


        function editar($scope, vacinaIntervaloDose) {

            window.plugins.spinnerDialog.show("vacinação","Carregando...", false);


            var retorno = $q.defer();


            var objetosToJson = function () {

                return angular.toJson({
                    "sequencial": vacinaIntervaloDose.sequencial,
                    "vacinaVO": {"sequencial": $scope.vacina.sequencial},
                    "doseVO": {"sequencial": $scope.dose.sequencial},
                    "intervaloVO": {"sequencial": $scope.intervalo.sequencial}

                })

            }

            $http.post('http://192.168.0.20:8080/Vacinacao/rest/vacina_dose_intervalo/salvar', objetosToJson())
                .success(function (resposta) {


                    retorno.resolve(resposta);

                    if (resposta[0].resultado == 'OK') {

                        alert("Salvo com sucesso!");


                    }

                })
                .error(function (data, status) {

                    window.plugins.spinnerDialog.hide();

                    console.log(data);
                    alert(status)

                })

            return retorno.promise;


        }

        function remover(vacinaDoseIntervalo) {

            var retorno = $q.defer();


            var confirm = $mdDialog.confirm()
                .title('Deseja realmente excluir a dose?')
                .content(vacinaDoseIntervalo.vacinaVO.nome)
                .ariaLabel('Lucky day')
                .ok('Sim')
                .cancel('Não');
            $mdDialog.show(confirm).then(function () {

                $http.delete('http://192.168.0.20:8080/Vacinacao/rest/vacina_dose_intervalo/remover/' + vacinaDoseIntervalo.sequencial)
                    .success(function (resposta) {

                        retorno.resolve(resposta);
                    })
                    .error(function (resposta) {

                        console.log(resposta);
                    })

            });


            return retorno.promise;


        }

        return {

            verTodas: verTodas,
            verTodasPorSequencialVacina: verTodasPorSequencialVacina,
            salvar: salvar,
            remover: remover,
            editar: editar


        }

    }]);

}());


