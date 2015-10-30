/**
 * Created by angelorobson on 25/10/15.
 */
(function () {

    'use strict';

    app.controller('RedefinirSenhaCtrl', ['$scope', 'RedefinirSenhaFactory', '$rootScope', '$routeParams', function ($scope, RedefinirSenhaFactory, $rootScope, $routeParams) {

        $rootScope.esconderHeader = true;
        $rootScope.titulo = 'Redefinir Senha';

        $rootScope.tgState = false;

        $scope.tgState = false;


        var usuarioJson = {"email": $routeParams.email}

        $scope.usuario = usuarioJson;

        console.log($routeParams.email);


        $scope.redefinirSenha = function () {

            RedefinirSenhaFactory.redefinirSenha($scope.usuario);
        }




    }]);

}());