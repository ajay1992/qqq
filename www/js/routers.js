angular.module('starter.routers', []);

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppController'
    })
    
    
    .state('app.addinventory', {
      url: '/add-inventory',
      views: {
        'menuContent': {
          templateUrl: 'templates/add_inventory.html',
          controller: 'AddInventoryController'
        }
      }
    })
    .state('app.inventoryitems', {
      url: '/inventory-items',
      views: {
        'menuContent': {
          templateUrl: 'templates/inventory_items.html',
          controller: 'InventoryItemsController'
        }
      }
    })
    .state('app.itemdetail', {
      url: '/item-detail/:itemId',
      views: {
        'menuContent': {
          templateUrl: 'templates/item_detail.html',
          controller: 'ItemDetailController'
        }
      }
    })
 

  $urlRouterProvider.otherwise('/app');
});
