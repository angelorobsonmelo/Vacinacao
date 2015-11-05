/**
 * Created by angelorobson on 25/10/15.
 */

/**
 * Created by angelorobson on 25/10/15.
 */
(function () {

    'use strict';

    app.factory('EsqueceuSenhaFactory', ['$http', '$q', '$mdDialog', function ($http, $q, $mdDialog) {


        function enviarEmailParaRecuperacaoDeSenha(usuario, $scope) {


            window.plugins.spinnerDialog.show("vacinação","Carregando...", false);

            $http.get('http://192.168.0.20:8080/Vacinacao/rest/usuario/pesquisarPorEmail/' + usuario.email)
                .success(function (resposta) {


                    if (resposta != '') {


                        $mdDialog.show(
                            $mdDialog.alert()
                                .parent(angular.element(document.body))
                                .title('Aviso!')
                                .content('Email enviado com sucesso!')
                                .ariaLabel('Alert Dialog Demo')
                                .ok('OK')
                        );

                        $scope.usuario = null;

                        window.plugins.spinnerDialog.hide();

                    } else {

                        $mdDialog.show(
                            $mdDialog.alert()
                                .parent(angular.element(document.body))
                                .title('Aviso!')
                                .content('Este email não está cadastrado em nosso sistema, certifique-se se o mesmo está correto')
                                .ariaLabel('Alert Dialog Demo')
                                .ok('OK')
                        );




                    }


                })
                .error(function (data, status) {

                    window.plugins.spinnerDialog.hide();

                    console.log(data);
                    alert(status)

                })


        }

        return {

            enviarEmailParaRecuperacaoDeSenha: enviarEmailParaRecuperacaoDeSenha


        }

    }]);

}());


