/**
 *
 */
(function () {

    'use strict';

    app
        .factory('UnidadeDeSaudeFactory', ['$http', '$q', '$location', '$mdDialog', function ($http, $q, $location, $mdDialog) {


            function consultarTodos() {

                window.plugins.spinnerDialog.show("vacinação", "Carregando...", false);

                var retorno = $q.defer();

                $http.get('http://192.168.0.20:8080/Vacinacao/rest/unidadeDeSaude/consultarTodas')
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

            function salvar(unidadeDeSaude) {

                window.plugins.spinnerDialog.show("vacinação", "Carregando...", false);

                var retorno = $q.defer();

                $http.post('http://192.168.0.20:8080/Vacinacao/rest/unidadeDeSaude/salvar', unidadeDeSaude)
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

            function remover(unidadeDeSaude, ev) {

                var retorno = $q.defer();


                var confirm = $mdDialog.confirm()
                    .title('Deseja realmente excluir?')
                    .content(unidadeDeSaude.nome)
                    .ariaLabel('Lucky day')
                    .targetEvent(ev)
                    .ok('Sim')
                    .cancel('Não');
                $mdDialog.show(confirm).then(function () {

                    $http.delete('http://192.168.0.20:8080/Vacinacao/rest/unidadeDeSaude/remover/' + unidadeDeSaude.sequencial)
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

                consultarTodos: consultarTodos,
                salvar: salvar,
                remover: remover

            }


        }])

}())