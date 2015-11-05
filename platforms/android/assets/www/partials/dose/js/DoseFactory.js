/**
 * Created by angelorobson on 25/10/15.
 */

/**
 * Created by angelorobson on 25/10/15.
 */
(function () {

    'use strict';

    app.factory('DoseFactory', ['$http', '$q', '$mdDialog', function ($http, $q, $mdDialog) {


        function verTodas() {

            window.plugins.spinnerDialog.show("vacinação","Carregando...", false);

            var retorno = $q.defer();

            $http.get('http://192.168.0.20:8080/Vacinacao/rest/dose/listarTodas')
                .success(function (resposta) {


                    retorno.resolve(resposta);

                    window.plugins.spinnerDialog.hide();

                })
                .error(function (data, status) {

                    window.plugins.spinnerDialog.hide();

                    console.log(data);
                    alert(status)

                })

            return retorno.promise;


        }

        function salvarDose(dose) {

            var retorno = $q.defer();

            $http.post('http://192.168.0.20:8080/Vacinacao/rest/dose/salvar', dose)
                .success(function (resposta) {


                    retorno.resolve(resposta);

                })
                .error(function (data, status) {

                    window.plugins.spinnerDialog.hide();

                    console.log(data);
                    alert(status)

                })

            return retorno.promise;


        }


        function remover(dose, ev) {

            var retorno = $q.defer();


            var confirm = $mdDialog.confirm()
                .title('Deseja realmente excluir?')
                .content(dose.descricao)
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Sim')
                .cancel('Não');
            $mdDialog.show(confirm).then(function() {

                $http.delete('http://192.168.0.20:8080/Vacinacao/rest/dose/remover/'+ dose.sequencial)
                    .success(function (resposta) {

                        retorno.resolve(resposta);
                    })
                    .error(function(resposta) {

                        console.log(resposta);
                    })

            });




            return retorno.promise;

        }

        return {

            verTodas: verTodas,
            salvarDose: salvarDose,
            remover: remover


        }

    }]);

}());


