angular.
  module('tokyoBurgerMapApp').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {

      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/burgers', {
          template: '<burger-list></burger-list>'
        }).
        when('/burgers/:burgerId', {
          template: '<burger-detail></burger-detail>'
        }).
        otherwise('/burgers');

    }
  ]);
