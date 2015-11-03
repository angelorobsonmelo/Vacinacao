/**
 *
 */
(function () {

    'use strict';

    app
        .factory('LoginFactory', ['$http', '$q', '$location', '$mdDialog', function ($http, $q, $location, $mdDialog) {

            function loginConvencional(usuario) {

                var retorno = $q.defer();

                $http.get('http://192.168.0.9:8080/Vacinacao/rest/usuario/login/' + usuario.email + '/' + usuario.senha)
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


                        } else if (data.tipoUsuario.sequencial == 2) {

                            retorno.resolve(data);

                            $location.path('lista-de-unidades-de-saude');
                        }
                        else if (data.tipoUsuario.sequencial == 1) {

                            retorno.resolve(data);

                            $location.path('campanha');
                        }

                    })
                    .error(function (data) {

                        console.log(data);
                    })

                return retorno.promise;


            }


            function atualizarDados(usuario) {

                var retorno = $q.defer();

                $http.get('http://192.168.0.9:8080/Vacinacao/rest/usuario/login/' + usuario.email + '/' + usuario.senha)
                    .success(function (data) {

                        retorno.resolve(data);

                    })
                    .error(function (data) {

                        console.log(data);
                    })

                return retorno.promise;


            }


            function pesquisarPorEmailPosLogin(usuario) {


                $http.get('http://192.168.0.9:8080/Vacinacao/rest/usuario/pesquisarPorEmailPosLogin/' + usuario.email)
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