/**
 * Created by angelorobson on 24/10/15.
 */
(function () {

    app.controller('MensagemRecebidaCtrl', ['$scope', '$routeParams', '$location', '$mdDialog', function ($scope,$routeParams, $location, $mdDialog) {


        var mensagem = $routeParams.mensagem;



        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.body))
                .title('Aviso!')
                .content(mensagem)
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')

        );

        window.location = "file:///android_asset/www/index.html#/"

      //  $location.path('/');


    }]);


}());