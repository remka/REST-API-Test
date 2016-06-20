'use strict';

angular.
  module('burgerDetail').
  component('burgerDetail', {
    template: 'XXX TBD: Detail view for <span>{{$ctrl.burgerId}}</span>',
    controller: ['$routeParams', 'Burger',
      function BurgerDetailController($routeParams) {
        this.burgerId = $routeParams.burgerId;
      }
    ]
  });
