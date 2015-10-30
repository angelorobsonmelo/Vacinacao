/**
 * 
 */
(function() {

	'use strict';

	app
	.factory('UsuarioFactory', ['$http', '$q', function($http, $q) {


		function cadastrar(usuario) {

			var retorno = $q.defer();

			$http.post('rest/usuario/salvar', usuario)
			.success(function() {

				retorno.resolve(true)
			})
			.error(function(data) {

				retorno.resolve(false)
				console.log(data);
			})

			return retorno.promise; 
		}

		function buscarTodos() {

			var retorno = $q.defer();

			$http.get('rest/usuario/buscarTodos')
			.success(function(dados) {

				retorno.resolve(dados);

			})
			.error(function(data) {

				console.log(data);
			})


			return retorno.promise;	

		}

		function excluir(sequencial) {


			var retorno = $q.defer();


			var r = confirm("Deseja realmente excluir?");

			if (r == true) { 

				$http.delete('rest/usuario/excluir/' + sequencial)
				.success(function() {

					retorno.resolve(true);
				})
				.error(function(data) {

					console.log(data);
					retorno.resolve(false);

				})

			} else {
				alert("clicou no false");
			}

			return retorno.promise;
		}

		function buscarUsuarioPorSequencial(sequencial) {

			var retorno = $q.defer();


			$http.get('rest/usuario/pesquisarPorId/' + sequencial)
			.success(function(data) {

				retorno.resolve(data);
			})
			.error(function(data) {

				console.log(data);
				retorno.resolve(data);

			})


			return retorno.promise;

		}


		function atualizar(usuario) {

			var retorno = $q.defer();

			$http.put('rest/usuario/atualizar', usuario)
			.success(function(data) {

				retorno.resolve(true);

			})
			.error(function(data) {

				retorno.resolve(false);

			})

			return retorno.promise;

		}

		return {

			cadastrar: cadastrar,
			buscarTodos: buscarTodos,
			excluir: excluir,
			buscarUsuarioPorSequencial: buscarUsuarioPorSequencial,
			atualizar: atualizar

		}


	}])

}())