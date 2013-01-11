'use strict';

/* Controllers */

function ItemListCtrl($scope, $http) {
    var items = [],
        currentPage = 1,
        itemCount = null,
        pageCount = null;

    $http.get('items.json').success(function(data) {
        $scope.initItems(data);
    });

    $scope.initItems = function(data) {
        items = data;
        itemCount = items.length;
        $scope.updatePageCount();
    };

    $scope.updateItems = function() {
        var offset = (currentPage - 1) * $scope.itemCountPerPage;

        $scope.items = [];
        angular.forEach(items, function(value, key){
            if (key >= offset && this.length < $scope.itemCountPerPage) {
                this.push(value);
            }
        }, $scope.items);
    };

    $scope.setPage = function(page) {
        if (page < pageCount) {
            currentPage = page;
        } else {
            currentPage = pageCount;
        }
        $scope.updateItems();
    };

    $scope.updatePageCount = function() {
        pageCount =  Math.ceil(itemCount / $scope.itemCountPerPage);
        $scope.setPage(currentPage);
    };

    $scope.orderProp = 'fiscal_year';
    $scope.itemCountPerPage = 10;
}