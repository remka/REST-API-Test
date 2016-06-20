// Register the `burgerList` component on the `burgerList` module,
angular.
  module('burgerList').
  component('burgerList', {
    templateUrl: 'js/burger-list/burger-list.template.html',
    controller: function BurgerListController() {
      this.burgers = [
        {
          name: 'Nexus S',
          snippet: 'Fast just got faster with Nexus S.',
          age: 52
        }, {
          name: 'Motorola XOOM™ with Wi-Fi',
          snippet: 'The Next, Next Generation tablet.',
          age: 10
        }, {
          name: 'MOTOROLA XOOM™',
          snippet: 'The Next, Next Generation tablet.',
          age: 100
        }, {
          name: 'Un truc',
          snippet: 'Oais ca va bon.',
          age: 7
        }, {
          name: '浦島太郎',
          snippet: '日本語でですか？',
          age: 3
        }
      ];

      this.orderProp = 'age';

    }
});
