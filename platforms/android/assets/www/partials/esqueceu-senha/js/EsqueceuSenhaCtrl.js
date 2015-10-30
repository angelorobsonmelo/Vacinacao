/**
 * Created by angelorobson on 25/10/15.
 */
(function () {

    'use strict';

    app.controller('EsqueceuSenhaCtrl', ['$scope', 'EsqueceuSenhaFactory', '$mdDialog', function ($scope, EsqueceuSenhaFactory, $mdDialog) {


        $scope.enviarEmailParaRecuperacaoDeSenha = function () {


            EsqueceuSenhaFactory.enviarEmailParaRecuperacaoDeSenha($scope.usuario, $scope);

        }


        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };


    }]);

}());