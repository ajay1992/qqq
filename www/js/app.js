
var db = null;
 angular.module('starter', ['ionic','starter.controllers', 'starter.routers','starter.services','ngCordova']);

 .run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
     db = $cordovaSQLite.openDB("my.db");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS products (id integer primary key, name varchar(30), description varchar(100), remaining_amount integer, selling_price NUMERIC, purchase_price NUMERIC, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DEFAULT CURRENT_TIMESTAMP);");
  });
});
