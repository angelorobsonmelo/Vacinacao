/**
 * 
 */
(function() {

	'use strict';

	app
	.controller('UsuarioCtrl', ['$scope', 'UsuarioFactory', function($scope, UsuarioFactory){


		$scope.cadastrar = function() {

			UsuarioFactory.cadastrar($scope.usuario).then(function(data) {


				if(data) {

					alert("salvo com sucesso!");
					$scope.usuario = '';
					carregaruUsuarios();
				}

			})

		}


		carregaruUsuarios();

		function carregaruUsuarios() {

			UsuarioFactory.buscarTodos().then(function(dados) {

				var dadosCopy = angular.copy(dados);

				$scope.usuarios = dadosCopy;

			})

		}


		$scope.excluir = function(sequencial) {

			UsuarioFactory.excluir(sequencial).then(function(data) {


				if(data) {

					alert("excluído com sucesso!");
					carregaruUsuarios();
				}

			})

		}

		$scope.buscarUsuarioPorSequencial = function(sequencial) {

			UsuarioFactory.buscarUsuarioPorSequencial(sequencial).then(function(data) {

				var dadosCopy = angular.copy(data);

				$scope.usuario = dadosCopy;

			})

		}
		
		
		$scope.atualizar = function(usuario) {
			
			UsuarioFactory.atualizar(usuario).then(function(data) {
				
				if(data){
					
					alert("Atualizado com sucesso!");
					carregaruUsuarios();
				}else{
					
					
				}
				
			});
			
		}
		
		$scope.voltar = function() {
			
			$scope.usuario = '';
		}
		
		$scope.dinheiro = 12;


	}]);



}())