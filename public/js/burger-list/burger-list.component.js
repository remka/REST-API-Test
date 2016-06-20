// Register the `burgerList` component on the `burgerList` module,
angular.
  module('burgerList').
  component('burgerList', {
  template:
      '<ul>' +
        '<li ng-repeat="burger in $ctrl.burgers">' +
          '<span>{{burger.name}}</span>' +
          '<p>{{burger.snippet}}</p>' +
        '</li>' +
      '</ul>',
  controller: function BurgerListController() {
    this.burgers = [
      {
        name: 'Nexus S',
        snippet: 'Fast just got faster with Nexus S.'
      }, {
        name: 'Motorola XOOM™ with Wi-Fi',
        snippet: 'The Next, Next Generation tablet.'
      }, {
        name: 'MOTOROLA XOOM™',
        snippet: 'The Next, Next Generation tablet.'
      }
    ];
  }
});
