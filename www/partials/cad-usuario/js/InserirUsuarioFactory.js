/**
 *
 */
(function () {

    'use strict';

    app
        .factory('CadUsuarioFactory', ['$http', '$q', '$location', function ($http, $q, $location) {

            function inserirUsuario(usuario) {

                window.plugins.spinnerDialog.show("vacinação","Carregando...", false);

                var retorno = $q.defer();

                var regId = localStorage.getItem("regID");


                usuario.regId = regId;

                console.log(usuario);

                $http.post('http://192.168.0.20:8080/Vacinacao/rest/usuario/inserir', usuario)
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

            return {

                inserirUsuario: inserirUsuario

            }


        }])

}())