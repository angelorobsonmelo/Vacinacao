var app = angular.module('App', []);

app.controller('TesteAppCtrl', ['$scope', function ($scope) {


    alert("asfd");
    $scope.alertar = function () {

        alert(device.uuid);
        //window.plugins.toast.show(device.uuid, 'long', 'center', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)})

    }

}]);