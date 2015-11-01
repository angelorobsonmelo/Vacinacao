/**
 * Created by angelorobson on 25/10/15.
 */

/**
 * Created by angelorobson on 25/10/15.
 */
(function () {

    'use strict';

    app.factory('ManualDoViajanteFactory', ['$http', '$q', function ($http, $q) {


        function pesquisarVacinasDaRegiao(sequencialRegiao) {


            var retorno = $q.defer();

            $http.get('http://192.168.0.12:8080/Vacinacao/rest/regiao_vacina_viajante/listarTodasPorSequencialRegiao/' + sequencialRegiao)
                .success(function (resposta) {

                    retorno.resolve(resposta);
                })
                .error(function (resposta, status) {

                    console.log(resposta + ' ' + status);
                })


            return retorno.promise;

        }

        return {

            pesquisarVacinasDaRegiao: pesquisarVacinasDaRegiao


        }

    }]);

}());


