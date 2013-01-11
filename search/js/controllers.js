'use strict';

/* Controllers */

function ItemListCtrl($scope, $http) {
    $http.get('items.json').success(function(data) {
        $scope.items = data;
        $scope.pages = new Util.Pager($scope.items);
    });

    $scope.orderProp = 'fiscal_year';
}