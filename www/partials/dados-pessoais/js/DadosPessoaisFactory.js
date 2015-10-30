/**
 * Created by angelorobson on 25/10/15.
 */

/**
 * Created by angelorobson on 25/10/15.
 */
(function () {

    'use strict';

    app.factory('DadosPessoaisFactory', ['$http', '$q', function ($http, $q) {


        function teste() {

            alert("teste factory");
        }

        return {

            teste: teste


        }

    }]);

}());


