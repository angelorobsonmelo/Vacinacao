app.controller('HomeCtrl', function($scope, $location)
{

  $scope.alertar = function () {

    alert(device.uuid);

    alert("Alertou no controle da rota rapaz");
   // window.plugins.toast.show(device.uuid, 'long', 'center', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)})

  }



});