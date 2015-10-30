/**
 * Created by angelo on 23/06/15.
 */

(function () {

    'use strict';


    
    app.factory('UnidadeDeSaudeListaOKFactory', ['$http', '$q', function ($http, $q) {

        var origem;
        var listaDeUnidadeDeSaude;

         // PEGAR MINHA LOCALIZAÇÃO

        function success(position) {

            origem = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); // SETANDO NA VARIÁVEL ORIGEM A MINHA LOCALIZAÇÃO

           conectarServidor(); // Pegando os dados no servidor

        }

        function pegarMinhalocalizacaoOK() {

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(success);

            } else {
                error('Geo Location is not supported');
            }

        }


     // FIM DE PEGAR MINHA LOCALIZAÇÃO

        function conectarServidor(){

           $http.get('rest/unidadeDeSaude/consultarTodas')
               .success(function (retorno) {

            	   
            	   listaDeUnidadeDeSaude = retorno;

            	   listarUnidadeDeSaude();
            	   

               })
               .error(function (data) {
                   console.log(data);
               });

        }

        function listarUnidadeDeSaude() {

            for (var i = 0; i < listaDeUnidadeDeSaude.length; i++) {
                distancia(listaDeUnidadeDeSaude[i], i);
            }
        }


        function distancia(unidadeDeSaude, indice) {

                        var minhaOrigem = origem;
                        var destino = new google.maps.LatLng(unidadeDeSaude.latitude, unidadeDeSaude.longitude);

                        var service = new google.maps.DistanceMatrixService();
                        service.getDistanceMatrix(
                            {
                                origins: [minhaOrigem],
                                destinations: [destino],
                                travelMode: google.maps.TravelMode.DRIVING,
                                avoidHighways: false,
                                avoidTolls: false
                            }, callback);


                    function callback(response, status) {
                        if (status == google.maps.DistanceMatrixStatus.OK) {
                            var origins = response.originAddresses;
                            var destinations = response.destinationAddresses;

                            for (var i = 0; i < origins.length; i++) {
                                var results = response.rows[i].elements;
                                for (var j = 0; j < results.length; j++) {
                                    var element = results[j];
   
                                    var distance = element.distance.text;
                                    var duration = element.duration.text;
                                    var distanceBrute = element.duration.value;
                                    var from = origins[i];
                                    var to = destinations[j];

                                    console.log("empresa original do array: "+listaDeUnidadeDeSaude[indice].nome);
                                    unidadeDeSaude.distancia = distance;
                                    unidadeDeSaude.duracao = duration;
                                    unidadeDeSaude.distanciaBruta = distanceBrute;
                                    listaDeUnidadeDeSaude[indice] = unidadeDeSaude;
                                    console.log("empresa alterada no array: nome: "+listaDeUnidadeDeSaude[indice].nome+" - distancia: "+listaDeUnidadeDeSaude[indice].distancia +" - duracao: "+listaDeUnidadeDeSaude[indice].duracao +" - id: "+listaDeUnidadeDeSaude[indice].sequencial + "Distância bruta: " + listaDeUnidadeDeSaude[indice].distanciaBruta);
                                    console.log("Tamanho do array: "+listaDeUnidadeDeSaude.length);

                                }
                            }

                            if(indice == listaDeUnidadeDeSaude.length - 1){
                                ordenarLista();
                            }

                        }else{
                            console.log("Erro na matrix.")
                        }
                    }
        }

        function ordenarLista(){

            var listaDeUnidadeDeSaudeRetornada = [];

            listaDeUnidadeDeSaude.sort(function (a, b) {
                if (a.distancia > b.distancia)
                    return 1;
                if (a.distancia < b.distancia)
                    return -1;
                // a must be equal to b
                return 0;
            });

            //console.log(listaDeUnidadeDeSaude[0].nome);
            console.log("Tamanho da lista ordenada: "+listaDeUnidadeDeSaude.length);
            for (var i = 0; i < listaDeUnidadeDeSaude.length; i++) {

            	listaDeUnidadeDeSaudeRetornada.push(listaDeUnidadeDeSaude[i]);
            }

            localStorage.setItem('ListaUnidadeDeSaude', angular.toJson(listaDeUnidadeDeSaudeRetornada));

        }



        return {

            pegarMinhalocalizacao: pegarMinhalocalizacao

        }

    }]);

}())