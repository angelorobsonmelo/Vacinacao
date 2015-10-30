/**
 * 
 */
(function() {

	'use strict';

	app
	.controller('LoginCtrl', ['$scope', 'LoginFactory', '$mdDialog', '$rootScope', '$location', 'UnidadeDeSaudeListaFactory', function($scope, LoginFactory, $mdDialog, $rootScope, $location, UnidadeDeSaudeListaFactory){

		$rootScope.esconderHeader = true;
		$rootScope.titulo = 'Login';
		
		$rootScope.tgState = false;

		$scope.tgState = false;

		UnidadeDeSaudeListaFactory.pegarMinhalocalizacao();

		$scope.loginConvencional = function() {


			///alert(device.uuid);


			LoginFactory.loginConvencional($scope.usuario).then(function(data) {


				localStorage.setItem('usuarioLogado', angular.toJson(data));
			});

		}



		$scope.alert = '';



		$scope.showAdvanced = function(ev) {
			$mdDialog.show({
				controller: DialogController,
				templateUrl: 'partials/cad-usuario/modal-cad-usuario.html',
				parent: angular.element(document.body),
				targetEvent: ev,
			})
			.then(function(answer) {
				$scope.alert = 'You said the information was "' + answer + '".';
			}, function() {
				$scope.alert = 'You cancelled the dialog.';
			});
		};


			$scope.ModalEsqueceuSenha = function(ev) {
				$mdDialog.show({
					controller: 'EsqueceuSenhaCtrl',
					templateUrl: 'partials/esqueceu-senha/esqueceu-senha.html',
					parent: angular.element(document.body),
					targetEvent: ev,
				})
					.then(function(answer) {
						$scope.alert = 'You said the information was "' + answer + '".';
					}, function() {
						$scope.alert = 'You cancelled the dialog.';
					});
			};

	}]);


	function DialogController($scope, $mdDialog, CadUsuarioFactory, $location, LoginFactory) {


		$scope.genders = ['Masculino', 'Feminino', 'Outros'];


		$scope.inserirUsuario = function() {

			CadUsuarioFactory.inserirUsuario($scope.usuario).then(function(data) {

				if(data[0].resultado == 'OK'){

					$mdDialog.show(
							$mdDialog.alert()
							.parent(angular.element(document.body))
							.title('Aviso!')
							.content('Bem vindo! ' + $scope.usuario.nome +' '+ $scope.usuario.sobrenome)
							.ariaLabel('Alert Dialog Demo')
							.ok('OK')
							
					);


					LoginFactory.pesquisarPorEmailPosLogin($scope.usuario);


					$location.path('lista-de-unidades-de-saude');

					$mdDialog.hide();
				}

			})


		}

		$scope.hide = function() {
			$mdDialog.hide();
		};
		$scope.cancel = function() {
			$mdDialog.cancel();
		};
		$scope.answer = function(answer) {
			$mdDialog.hide(answer);
		};
	}


}())



