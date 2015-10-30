/**
 * 
 */
(function() {

	'use strict';

	app
	.controller('UnidadeDeSaudeCtrl', ['$scope', 'UnidadeDeSaudeFactory', '$mdDialog', '$rootScope', '$location', function($scope, UnidadeDeSaudeFactory, $mdDialog, $rootScope, $location){

		$rootScope.esconderHeader = true;
		$rootScope.titulo = 'Unidades de Saúde';

		$rootScope.tgState = false;

		$scope.tgState = false;

		carregarUnidadesDeSaude();


		function carregarUnidadesDeSaude() {

			UnidadeDeSaudeFactory.consultarTodos().then(function(resposta) {

				var unidadesDesaudeCopy = angular.copy(resposta);

				$scope.unidadesDeSaude = unidadesDesaudeCopy; 

				console.log($scope.unidadesDeSaude);


			});






		}


		$scope.adicionarUnidadeDeSaude = function(ev) {

			var unidadeDeSaude = '';

			$mdDialog.show({
				controller: DialogController,
				templateUrl: 'partials/campanha/modals/salvar-unidade-de-saude.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				resolve: {
					unidadeDeSaude: function () {
						return unidadeDeSaude;
					}
				}
			})



		}


		$scope.remover = function(unidadeDeSaude) {

			UnidadeDeSaudeFactory.remover(unidadeDeSaude).then(function(resposta) {

				if(resposta[0].resultado == 'OK'){

					$mdDialog.show(
							$mdDialog.alert()
							.parent(angular.element(document.body))
							.title('Aviso!')
							.content('Excluído com Sucesso!')
							.ariaLabel('Alert Dialog Demo')
							.ok('OK')

					);

					carregarUnidadesDeSaude();

				}

			});
		}


		$scope.editar = function(unidadeDeSaude, ev) {

			$mdDialog.show({
				controller: DialogController,
				templateUrl: 'partials/campanha/modals/salvar-unidade-de-saude.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				resolve: {
					unidadeDeSaude: function () {
						return unidadeDeSaude;
					}
				}
			});

		}

		function DialogController($scope, $mdDialog, $location, UnidadeDeSaudeFactory, unidadeDeSaude) {

			$scope.unidadeDeSaude = unidadeDeSaude;

			$scope.salvar = function() {


				UnidadeDeSaudeFactory.salvar($scope.unidadeDeSaude).then(function(data) {

					if(data[0].resultado == 'OK'){

						$mdDialog.show(
								$mdDialog.alert()
								.parent(angular.element(document.body))
								.title('Aviso!')
								.content('Salvo com Sucesso!')
								.ariaLabel('Alert Dialog Demo')
								.ok('OK')

						);

						carregarUnidadesDeSaude();
						$mdDialog.hide();
					}

				});



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







	}]);


}())



