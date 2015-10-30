/**
 * Created by angelorobson on 25/10/15.
 */

/**
 * Created by angelorobson on 25/10/15.
 */
(function () {

    'use strict';

    app.factory('VacinasFaseDaVidaFactory', ['$http', '$q', function ($http, $q) {


        function pesquisarVacinasPorFaseDaVida(sequencialFaseDaVida) {


            var retorno = $q.defer();

            $http.get('http://192.168.0.14:8080/Vacinacao/rest/vacina_fase_da_vida/listarTodas/' + sequencialFaseDaVida)
                .success(function (resposta) {

                    retorno.resolve(resposta);
                })
                .error(function (resposta, status) {

                    console.log(resposta + ' ' + status);
                })


            return retorno.promise;

        }

        return {

            pesquisarVacinasPorFaseDaVida: pesquisarVacinasPorFaseDaVida


        }

    }]);

}());


