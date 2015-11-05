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

            window.plugins.spinnerDialog.show("vacinação","Carregando...", false);

            $http.post('http://192.168.0.20:8080/Vacinacao/rest/usuario/redefinirSenha', usuario)
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

                        window.plugins.spinnerDialog.hide();

                    }


                })
                .error(function (data, status) {

                    window.plugins.spinnerDialog.hide();

                    console.log(data);
                    alert(status)

                })

        }

        return {

            redefinirSenha: redefinirSenha


        }

    }]);

}());


