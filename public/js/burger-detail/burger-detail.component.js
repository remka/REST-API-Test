angular.
  module('burgerDetail').
  component('burgerDetail', {
    template: 'TBD: Detail view for <span>{{$ctrl.burgerId}}</span>',
    controller: ['$routeParams',
      function BurgerDetailController($routeParams) {
        this.burgerId = $routeParams.burgerId;
      }
    ]
  });
