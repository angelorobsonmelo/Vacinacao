var app = angular.module('app', ['ngRoute', 'ngMaterial', 'ngAnimate', 'ngMessages', 'ngAria', 'ngHamburger', 'ngMap']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider

        .when('/lista-de-unidades-de-saude', {
            controller: 'UnidadeDeSaudeListaCtrl',
            templateUrl: 'partials/unidade-de-saude-lista/unidade-de-saude-lista.html'
        })
        .when('/lista-de-unidades-de-saude-mapa', {
            controller: 'ListaUnidadeDeSaudeMapaCtrl',
            templateUrl: 'partials/unidade-de-saude-lista-mapa/unidade-de-saude-lista-mapa.html'
        })
        .when('/detalhes-unidade-de-saude', {
            controller: 'DetalhesCtrl',
            templateUrl: 'partials/detalhes-unidade-de-saude/detalhes-unidade-de-saude.html'
        })
        .when('/ver-unidade-de-saude-no-mapa', {
            controller: 'VerUnidadeDeSaudeNoMapaCtrl',
            templateUrl: 'partials/ver-unidade-de-saude-no-mapa/ver-unidade-de-saude-no-mapa.html'
        })
        .when('/rota/:obj', {
            controller: 'RotaCtrl',
            templateUrl: 'partials/rota/rota.html'
        })
        .when('/simple-map', {
            controller: 'SimpleMapCtrl',
            templateUrl: 'partials/simple-map/simple-map.html'
        })
        .when('/campanha', {
            controller: 'CampanhaCtrl',
            templateUrl: 'partials/campanha/campanha.html'
        })
        .when('/', {
            controller: 'LoginCtrl',
            templateUrl: 'partials/login/login.html'
        })
        .when('/mensagem-recebida/:mensagem', {
            controller: 'MensagemRecebidaCtrl',
            templateUrl: 'partials/mensagem_recebida/mensagem_recebida.html'
        })
        .when('/manual-do-viajante', {
            controller: 'ManualDoViajanteCtrl',
            templateUrl: 'partials/manual-do-viajante/manual-do-viajante.html'
        })
        .when('/vacinas-fase-da-vida', {
            controller: 'VacinasFaseDaVidaCtrl',
            templateUrl: 'partials/vacina-fase-da-vida/vacinas-fase-da-vida.html'
        })
        .when('/dados-pessoais', {
            controller: 'DadosPessoaisCtrl',
            templateUrl: 'partials/dados-pessoais/dados-pessoais.html'
        })
        .when('/redefinir-senha/:email', {
            controller: 'RedefinirSenhaCtrl',
            templateUrl: 'partials/redefinir-senha/redefinir-senha.html'
        })
        .when('/visualizar-campanha', {
            controller: 'VisualizarCampanhaCtrl',
            templateUrl: 'partials/visualizar-campanha/visualizar-campanha.html'
        })

        .otherwise('/');
}]);

app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('custom', 'default')
        .primaryPalette('light-green')
        .accentPalette('deep-purple');
});
