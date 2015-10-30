/**
 * 
 */
(function() {

	'use strict';

	app
	.controller('CampanhaCtrl', ['$scope', 'CampanhaFactory', '$mdDialog', '$rootScope', '$location', function($scope, CampanhaFactory, $mdDialog, $rootScope, $location){

		$rootScope.esconderHeader = true;
		$rootScope.titulo = 'Campanhas';

		$rootScope.tgState = false;

		$scope.tgState = false;

		carregarCampanhas();

		function carregarCampanhas() {

			CampanhaFactory.consultarTodos().then(function(resposta) {

				var campanhasCopy = angular.copy(resposta);

				$scope.campanhas = campanhasCopy; 


			});
		}


		$scope.adicionarCampanha = function(ev) {

			var campanha = '';

			$mdDialog.show({
				controller: DialogController,
				templateUrl: 'partials/campanha/modals/salvar-campanha.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				resolve: {
					campanha: function () {
						return campanha;
					}
				}
			})



		}


		$scope.remover = function(campanha) {

			CampanhaFactory.remover(campanha).then(function(resposta) {

				if(resposta[0].resultado == 'OK'){

					$mdDialog.show(
							$mdDialog.alert()
							.parent(angular.element(document.body))
							.title('Aviso!')
							.content('Excluído com Sucesso!')
							.ariaLabel('Alert Dialog Demo')
							.ok('OK')

					);

					carregarCampanhas();

				}

			});
		}


		$scope.editar = function(campanha, ev) {

			$mdDialog.show({
				controller: DialogController,
				templateUrl: 'partials/campanha/modals/salvar-campanha.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				resolve: {
					campanha: function () {
						return campanha;
					}
				}
			});

		}

		function DialogController($scope, $mdDialog, $location, CampanhaFactory, campanha) {

			$scope.campanha = campanha;

			$scope.salvarCampanha = function() {


				CampanhaFactory.salvarCampanha($scope.campanha).then(function(data) {

					if(data[0].resultado == 'OK'){

						$mdDialog.show(
								$mdDialog.alert()
								.parent(angular.element(document.body))
								.title('Aviso!')
								.content('Salvo com Sucesso!')
								.ariaLabel('Alert Dialog Demo')
								.ok('OK')

						);

						carregarCampanhas();
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



