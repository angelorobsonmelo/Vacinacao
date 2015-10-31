/**
 * Created by angelorobson on 25/10/15.
 */

/**
 * Created by angelorobson on 25/10/15.
 */
(function () {

    'use strict';

    app.factory('VacinaUsuarioFactory', ['$http', '$q', function ($http, $q) {


        function listarTodasPorSequencialUsuario(){

            var retorno = $q.defer();

            var usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

            $http.get('http://192.168.0.14:8080/Vacinacao/rest/vacina_usuario/listarTodasPorSequencialUsuario/' + usuario.sequencial)
                .success(function (resposta) {

                    retorno.resolve(resposta);
                })
                .error(function(resposta) {

                    console.log(resposta);
                })
            return retorno.promise;

        }

        function salvarVacinaUsuario(vacinaUsuario) {

            var retorno = $q.defer();

            $http.post('http://192.168.0.14:8080/Vacinacao/rest/vacina_usuario/salvar', vacinaUsuario)
                .success(function (resposta) {

                    retorno.resolve(resposta);
                })
                .error(function(resposta) {

                    console.log(resposta);
                })
            return retorno.promise;


        }

        function remover(vacinaUsuario, ev) {

            var retorno = $q.defer();


            var confirm = $mdDialog.confirm()
                .title('Deseja realmente excluir?')
                .content(vacinaUsuario.titulo)
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Sim')
                .cancel('Não');
            $mdDialog.show(confirm).then(function() {

                $http.delete('http://192.168.0.14:8080/Vacinacao/rest/vacina_usuario/remover/'+ vacinaUsuario.sequencial)
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

            listarTodasPorSequencialUsuario: listarTodasPorSequencialUsuario,
            salvarVacinaUsuario: salvarVacinaUsuario,
            remover: remover

        }

    }]);

}());


