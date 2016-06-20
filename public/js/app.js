// Define the `phonecatApp` module
var tokyoBurgerMapApp = angular.module('tokyoBurgerMapApp', []);

// Define the `PhoneListController` controller on the `phonecatApp` module
tokyoBurgerMapApp.controller('BurgerListController', function BurgerListController($scope) {
  $scope.burgers = [
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
});
