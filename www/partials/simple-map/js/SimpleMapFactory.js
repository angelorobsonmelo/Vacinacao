/**
 * Created by angelo on 23/06/15.
 */
(function () {

    'use strict';



    app.factory('SimpleMapFactory', ['$q', '$rootScope', '$compile', function ($q, $rootScope, $compile) {


    	function carregarLocalizacao() {

			navigator.geolocation.getCurrentPosition(function (pos) {

				var myLatlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
				var mapOptions = {
						zoom: 14,
						center: myLatlng
				}

				var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

				var marker = new google.maps.Marker({
					position: myLatlng,
					map: map,
					title: 'Eu!'
				});

				
				var content = "<div style='text: center;'><h4>EU</h4></div>";
				var contentCompilad = $compile(content)($rootScope)



				var infowindowEu = new google.maps.InfoWindow({
					content: contentCompilad[0],

				});
				
				google.maps.event.addListener(marker, 'click', function() {
					infowindowEu.open(map,marker);
				});


				var unidadesDeSaude =  JSON.parse(localStorage.getItem("ListaUnidadeDeSaude"));


				angular.forEach(unidadesDeSaude, function(valor, item) {



					var contentStringUnidadeDeSaude = "<div><h1>" + valor.nome +" </h1> <a href='' ng-click='detalhes("+item+")'>Detalhes...</a></div>";
					var compiledUnidadeDeSaude = $compile(contentStringUnidadeDeSaude)($rootScope)



					var infowindow = new google.maps.InfoWindow({
						content: compiledUnidadeDeSaude[0],

					});

					var unidadeDeSaude = new google.maps.Marker({
						position: new google.maps.LatLng(valor.latitude, valor.longitude),
						icon: 'img/marcador-mapa-eu.png',
						map: map,
						title: valor.nome
					});
					google.maps.event.addListener(unidadeDeSaude, 'click', function() {
						infowindow.open(map,unidadeDeSaude);
					});


				}, function (error) {
					alert('Unable to get location: ' + error.message);
				});

			});
		}
      

        
     
        return{
           
        	carregarLocalizacao: carregarLocalizacao
        }

    }]);

}());