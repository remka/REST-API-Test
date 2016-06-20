// Register the `burgerList` component on the `burgerList` module,
angular.
  module('burgerList').
  component('burgerList', {
    templateUrl: 'js/burger-list/burger-list.template.html',
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
        }, {
          name: 'Un truc',
          snippet: 'Oais ca va bon.'
        }, {
          name: '浦島太郎',
          snippet: '日本語でですか？'
        }
      ];
    }
});
