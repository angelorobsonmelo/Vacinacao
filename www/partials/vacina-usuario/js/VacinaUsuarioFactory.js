/**
 * Created by angelorobson on 25/10/15.
 */

/**
 * Created by angelorobson on 25/10/15.
 */
(function () {

    'use strict';

    app.factory('VacinaUsuarioFactory', ['$http', '$q', '$mdDialog', 'VacinaDoseIntervaloFactory', function ($http, $q, $mdDialog, VacinaDoseIntervaloFactory) {


        function listarTodasPorSequencialUsuario() {

            var retorno = $q.defer();

            var usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

            $http.get('http://192.168.0.14:8080/Vacinacao/rest/vacina_usuario/listarTodasPorSequencialUsuario/' + usuario.sequencial)
                .success(function (resposta) {

                    retorno.resolve(resposta);
                })
                .error(function (resposta) {

                    // console.log(resposta);
                })
            return retorno.promise;

        }

        function salvarVacinaUsuario(vacinaUsuario, $scope) {

            var usuario = JSON.parse(localStorage.getItem("usuarioLogado"));


            vacinaUsuario.usuarioVO = usuario;

            var retorno = $q.defer();

            $http.post('http://192.168.0.14:8080/Vacinacao/rest/vacina_usuario/salvar', vacinaUsuario)
                .success(function (resposta) {

                    retorno.resolve(resposta);

                    agendarNotificacao($scope);


                })
                .error(function (resposta) {

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
            $mdDialog.show(confirm).then(function () {

                $http.delete('http://192.168.0.14:8080/Vacinacao/rest/vacina_usuario/remover/' + vacinaUsuario.sequencial)
                    .success(function (resposta) {

                        retorno.resolve(resposta);
                    })
                    .error(function (resposta) {

                        console.log(resposta);
                    })

            });


            return retorno.promise;

        }


        function agendarNotificacao($scope) {


            //console.log($scope.dose);

            //console.log($scope.vacinaUsuario);

            var dias = 0;

            VacinaDoseIntervaloFactory.verTodasPorSequencialVacina($scope.vacinaUsuario.vacinaVO).then(function (resposta) {


                angular.forEach(resposta, function (value, index) {

                    if ($scope.dose.doseVO.descricao != value.doseVO.descricao) {

                        if (value.intervaloVO.dias >= $scope.dose.intervaloVO.dias) {

                            console.log(value.vacinaVO.nome);

                            console.log(value.doseVO.descricao);

                            dias += value.intervaloVO.dias;

                            console.log(dias);

                            var data = moment($scope.vacinaUsuario.dataVacinacao).add(dias, 'days').format('YYYY-MM-DD');

                            console.log(data);


                        }


                    }

                });


            });


        }

        return {

            listarTodasPorSequencialUsuario: listarTodasPorSequencialUsuario,
            salvarVacinaUsuario: salvarVacinaUsuario,
            remover: remover

        }

    }]);

}());


