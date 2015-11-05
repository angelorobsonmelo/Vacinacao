/**
 *
 */
(function () {

    'use strict';

    app
        .factory('LoginFactory', ['$http', '$q', '$location', '$mdDialog', function ($http, $q, $location, $mdDialog) {

            function loginConvencional(usuario) {

                window.plugins.spinnerDialog.show("vacinação","Carregando...", false);

                var retorno = $q.defer();

                $http.get('http://192.168.0.20:8080/Vacinacao/rest/usuario/login/' + usuario.email + '/' + usuario.senha)
                    .success(function (data) {

                        if (data == '') {


                            $mdDialog.show(
                                $mdDialog.alert()
                                    .parent(angular.element(document.body))
                                    .title('Aviso!')
                                    .content('Email ou senha incorreta')
                                    .ariaLabel('Alert Dialog Demo')
                                    .ok('OK')
                            );
                            window.plugins.spinnerDialog.hide();

                        } else if (data.tipoUsuario.sequencial == 2) {

                            retorno.resolve(data);

                            window.plugins.spinnerDialog.hide();

                            $location.path('lista-de-unidades-de-saude');
                        }
                        else if (data.tipoUsuario.sequencial == 1) {

                            window.plugins.spinnerDialog.hide();

                            retorno.resolve(data);

                            $location.path('campanha');
                        }

                    })
                    .error(function (data, status) {

                        window.plugins.spinnerDialog.hide();

                        console.log(data);
                        alert(status)

                    })

                return retorno.promise;


            }


            function atualizarDados(usuario) {

                window.plugins.spinnerDialog.show("vacinação","Carregando...", false);

                var retorno = $q.defer();

                $http.get('http://192.168.0.20:8080/Vacinacao/rest/usuario/login/' + usuario.email + '/' + usuario.senha)
                    .success(function (data) {

                        retorno.resolve(data);

                        window.plugins.spinnerDialog.hide();

                    })
                    .error(function (data, status) {

                        window.plugins.spinnerDialog.hide();

                        console.log(data);
                        alert(status)

                    })

                return retorno.promise;


            }


            function pesquisarPorEmailPosLogin(usuario) {


                $http.get('http://192.168.0.20:8080/Vacinacao/rest/usuario/pesquisarPorEmailPosLogin/' + usuario.email)
                    .success(function (resposta) {

                        localStorage.setItem('usuarioLogado', angular.toJson(resposta));


                    })
                    .error(function (data) {

                        console.log(data);

                    })


            }

            return {

                loginConvencional: loginConvencional,
                atualizarDados: atualizarDados,
                pesquisarPorEmailPosLogin: pesquisarPorEmailPosLogin

            }


        }])

}())