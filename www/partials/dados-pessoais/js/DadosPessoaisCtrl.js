/**
 * Created by angelorobson on 25/10/15.
 */
(function () {

    'use strict';

    app.controller('DadosPessoaisCtrl', ['$scope', 'DadosPessoaisFactory', '$rootScope', '$location', 'CadUsuarioFactory', '$mdDialog', 'LoginFactory', function ($scope, DadosPessoaisFactory, $rootScope, $location, CadUsuarioFactory, $mdDialog, LoginFactory) {
        $scope.genders = ['Masculino', 'Feminino', 'Outros'];


        $rootScope.titulo = "Dados Pessoais";
        $rootScope.esconderMenu = false;

        $rootScope.activetab = $location.path();

        $rootScope.mostrarMenuEscolhido = function () {

            $rootScope.tgState = false;

        }


        var usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

        var dataNascimentoConvertida = new Date(usuarioLogado.dataNascimento);

        usuarioLogado.dataNascimento = dataNascimentoConvertida;


        $scope.usuario = usuarioLogado;


        console.log($scope.usuario);


        $scope.inserirUsuario = function () {

            CadUsuarioFactory.inserirUsuario($scope.usuario).then(function (data) {

                if (data[0].resultado == 'OK') {

                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.body))
                            .title('Aviso!')
                            .content('Dados atualizado com sucesso!')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')
                    );




                    LoginFactory.atualizarDados($scope.usuario).then(function(data) {


                        localStorage.setItem('usuarioLogado', angular.toJson(data));

                       // var dataNascimentoConvertida = new Date(data.dataNascimento);

                     //   data.dataNascimento = dataNascimentoConvertida;

                        $scope.usuario = data;

                    });


                    $mdDialog.hide();
                }

            })


        }


    }]);

}());