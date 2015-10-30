/**
 * Created by angelorobson on 25/10/15.
 */

/**
 * Created by angelorobson on 25/10/15.
 */
(function () {

    'use strict';

    app.factory('RedefinirSenhaFactory', ['$http', '$q', '$mdDialog', '$location', function ($http, $q, $mdDialog, $location) {


        function redefinirSenha(usuario) {


            $http.post('http://192.168.0.10:8080/Vacinacao/rest/usuario/redefinirSenha', usuario)
                .success(function (resposta) {

                    if (resposta == 'OK') {

                        $mdDialog.show(
                            $mdDialog.alert()
                                .parent(angular.element(document.body))
                                .title('Aviso!')
                                .content('Senha Redefinida com Sucesso!')
                                .ariaLabel('Alert Dialog Demo')
                                .ok('OK')
                        );
                    }


                })
                .error(function (resposta) {

                    console.log(resposta);
                })

        }

        return {

            redefinirSenha: redefinirSenha


        }

    }]);

}());


