// Register the `burgerList` component on the `burgerList` module,
angular.
  module('burgerList').
  component('burgerList', {
    templateUrl: 'js/burger-list/burger-list.template.html',
    controller: function BurgerListController($http) {
      var self = this;
      self.orderProp = 'age';

      $http.get('data/burgers.json').then(function(response) {
        self.burgers = response.data;
      });

    }
});
