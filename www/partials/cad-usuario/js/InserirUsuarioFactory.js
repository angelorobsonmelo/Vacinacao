/**
 * 
 */
(function() {

	'use strict';

	app
	.factory('CadUsuarioFactory', ['$http', '$q', '$location', function($http, $q, $location) {

		function inserirUsuario(usuario) {

			var retorno = $q.defer();

			var regId = localStorage.getItem("regID");


			usuario.regId = regId;

			console.log(usuario);
			
			$http.post('http://192.168.0.14:8080/Vacinacao/rest/usuario/inserir', usuario)
			.success(function(data) {

				retorno.resolve(data);
				
			})
			.error(function(data) {

				console.log(data);
			})

			return retorno.promise; 
			
		
		}

		return {

			inserirUsuario: inserirUsuario

		}


	}])

}())