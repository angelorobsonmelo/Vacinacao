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


            window.plugins.spinnerDialog.show("vacinação","Carregando...", false);

            var retorno = $q.defer();

            $http.get('http://192.168.0.20:8080/Vacinacao/rest/vacina_fase_da_vida/listarTodas/' + sequencialFaseDaVida)
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

        return {

            pesquisarVacinasPorFaseDaVida: pesquisarVacinasPorFaseDaVida


        }

    }]);

}());


