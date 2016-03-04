 angular.module('starter.controllers', [ ]);

 .controller('AddInventoryController', function ($scope, $ionicPopup, Product) {
  $scope.addProduct = function (productData) {
    Product.add(productData);
    $scope.showAlert();
    productData.newItem = '';
  };

  $scope.showAlert = function () {
    var alertPopup = $ionicPopup.alert({
      title: 'Success',
      template: 'A new item has been added',
    });

    alertPopup.then(function (res) {
      console.log('Item is successfully inserted.');
    });
  };
});

.controller('InventoryItemsController', function ($scope, $ionicModal, $ionicPopup, Product) {
  $scope.inventory = [];

  $scope.$on('$ionicView.enter', function () {
    $scope.populateProducts();
  });

  $scope.populateProducts = function () {
    Product.orderByAmount().then(function (products) {
      $scope.inventory = products;
    });
  };

  $scope.editItem = function (productData) {
    Product.update(productData);
    $scope.populateProducts();
    $scope.closeItemModal();
    $scope.cleanForm();
  };

  $ionicModal.fromTemplateUrl('templates/edit_item.html', {
    scope: $scope,
    animation: 'slide-in-up',
  }).then(function (modal) {
    $scope.modal = modal;
  });

  $scope.openItemModal = function (item) {
    $scope.productData = {};

    Product.get(item.id).then(function (itemData) {
      $scope.productData.id = itemData.id;
      $scope.productData.name = itemData.name;
      $scope.productData.description = itemData.description;
      $scope.productData.amount = itemData.remaining_amount;
      $scope.productData.purchase_price = itemData.purchase_price;
      $scope.productData.selling_price = itemData.selling_price;
    });

    $scope.modal.show();
  };

  $scope.closeItemModal = function () {
    $scope.modal.hide();
  };

  $scope.cleanForm = function () {
    productData.newItem = '';
  };

  $scope.$on('$destroy', function () {
    $scope.modal.remove();
  });

  $scope.deleteItem = function (item) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Delete an Item',
      template: 'Are you sure you want to delete this item?',
    });

    confirmPopup.then(function (res) {
      if (res) {
        Product.delete(item);
        $scope.populateProducts();
      } else {
        console.log('You cancel deleting this item.');
      }
    });
  };
});

.controller('ItemDetailController', function ($scope, $stateParams, Product) {
  Product.get($stateParams.itemId).then(function (itemDetail) {
    $scope.product_name = itemDetail.name;
    $scope.product_description = itemDetail.description;
    $scope.product_amount = itemDetail.remaining_amount;
    $scope.purchase_price = itemDetail.selling_price;
    $scope.selling_price = itemDetail.purchase_price;
    $scope.created_date = itemDetail.created_date;
    $scope.updated_date = itemDetail.updated_date;
  });
});

 

