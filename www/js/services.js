 angular.module('starter.services', []);

.factory('DB', function ($q, $ionicPlatform, $cordovaSQLite) {
  this.queryStatement = function (query, parameters) {
    parameters = parameters || [];
    var q = $q.defer();

    $ionicPlatform.ready(function () {
      $cordovaSQLite.execute(db, query, parameters).then(function (res) {
        q.resolve(res);
      }, function (error) {
        console.error(error);
        q.reject(error);
      });
    });

    return q.promise;
  };

  this.getAll = function (res) {
    var output = [];

    if (res.rows.length) {
      for (var i = 0; i < res.rows.length; i++) {
        output.push(res.rows.item(i));
      }
    }

    return output;
  };

  this.getById = function (res) {
    var output = null;

    if (res.rows.length) {
      output = angular.copy(res.rows.item(0));
    }

    return output;
  };

  return this;
});



.factory('Product', function ($cordovaSQLite, DB) {
  this.all = function () {
    return DB.queryStatement('SELECT id, name FROM Products').then(function (res) {
      return DB.getAll(res);
    });
  };

  this.hasAmount = function () {
    return DB.queryStatement('SELECT id, name FROM Products WHERE remaining_amount > 0')
      .then(function (res) {
        return DB.getAll(res);
    });
  };

  this.get = function (productId) {
    var parameters = [productId];
    return DB.queryStatement('SELECT id, name, description, remaining_amount, ' +
      'selling_price, purchase_price, DATETIME(created_at, \'localtime\') AS ' +
      'created_date, DATETIME(updated_at, \'localtime\') AS updated_date ' +
      'FROM Products WHERE id = ?', parameters).then(function (res) {
        return DB.getById(res);
    });
  };

  this.getAmount = function (productId) {
    var parameters = [productId];
    return DB.queryStatement('SELECT remaining_amount FROM Products WHERE id = ?', parameters)
      .then(function (res) {
        return DB.getById(res);
    });
  };

  this.add = function (product) {
    var parameters = [
      product.name,
      product.description,
      product.amount,
      product.selling_price,
      product.purchase_price,
    ];
    return DB.queryStatement('INSERT INTO Products (name, description, remaining_amount, ' +
      'selling_price, purchase_price) VALUES (?, ?, ?, ?, ?)', parameters);
  };

  this.update = function (product) {
    var parameters = [
      product.name,
      product.description,
      product.selling_price,
      product.purchase_price, product.id,
    ];
    return DB.queryStatement('UPDATE Products SET name = ?, description = ?, ' +
      'selling_price = ?, purchase_price = ?, updated_at = DATETIME(\'now\') ' +
      'WHERE id = ?', parameters);
  };

  this.updateAmount = function (productId, productAmount) {
    var parameters = [productAmount, productId];
    return DB.queryStatement('UPDATE Products SET remaining_amount = ? WHERE id = ?', parameters);
  };

  this.delete = function (product) {
    var parameters = [product.id];
    return DB.queryStatement('DELETE FROM Products WHERE id = ?', parameters);
  };

  this.orderByAmount = function () {
    return DB.queryStatement('SELECT id, name, remaining_amount FROM Products ' +
      'ORDER BY remaining_amount DESC').then(function (res) {
        return DB.getAll(res);
    });
  };

  return this;
});

