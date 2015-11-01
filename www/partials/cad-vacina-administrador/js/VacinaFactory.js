/**
 * Created by angelorobson on 25/10/15.
 */

/**
 * Created by angelorobson on 25/10/15.
 */
(function () {

    'use strict';

    app.factory('VacinaFactory', ['$http', '$q', '$mdDialog', function ($http, $q, $mdDialog) {


        function verTodas() {

            var retorno = $q.defer();

            $http.get('http://192.168.0.12:8080/Vacinacao/rest/vacina/listarTodas')
                .success(function (resposta) {


                    retorno.resolve(resposta);

                })
                .error(function (data) {
                    console.log(data);
                })

            return retorno.promise;


        }

        function salvarVacina(vacina) {

            var retorno = $q.defer();

            $http.post('http://192.168.0.12:8080/Vacinacao/rest/vacina/salvar', vacina)
                .success(function (resposta) {


                    retorno.resolve(resposta);

                })
                .error(function (data) {
                    console.log(data);
                })

            return retorno.promise;


        }


        function remover(vacina, ev) {

            var retorno = $q.defer();


            var confirm = $mdDialog.confirm()
                .title('Deseja realmente excluir?')
                .content(vacina.nome)
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Sim')
                .cancel('Não');
            $mdDialog.show(confirm).then(function() {

                $http.delete('http://192.168.0.12:8080/Vacinacao/rest/vacina/remover/'+ vacina.sequencial)
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
            salvarVacina: salvarVacina,
            remover: remover


        }

    }]);

}());


