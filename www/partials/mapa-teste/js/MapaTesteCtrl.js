/**
 * Created by angelorobson on 25/10/15.
 */
(function () {

    'use strict';

    app.controller('MapaTesteCtrl', ['$scope', 'MapaTesteFactory', '$rootScope', '$compile', '$location', function ($scope, MapaTesteFactory, $rootScope, $compile, $location) {


        MapaTesteFactory.carregarLocalizacao();



    }]);

}());




