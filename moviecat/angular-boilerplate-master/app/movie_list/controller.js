'use strict';
(function (angular) {
    angular.module('myApp.moviecat', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/:category/:page', {
                templateUrl: 'in_theaters/view.html',
                controller: 'moviecatController'
            });
        }])

        .controller('moviecatController', ['$scope', '$http', '$route', '$routeParams', 'HttpService', 'APPConfig', function ($scope, $http, $route, $routeParams, HttpService, APPConfig) {
            var count = APPConfig.page_size;
            var page = parseInt($routeParams.page);
            var start = (page - 1) * count;
            $scope.totalPages = 0;
            $scope.subject = [];
            $scope.title = '';
            $scope.message = '';
            $scope.totalCount = 0;
            $scope.currentPage = page;
            $scope.loading = false;
            var doubanApiAddress = APPConfig.listApiAddress + $routeParams.category;
            HttpService.jsonp(
                doubanApiAddress,
                {
                    count: count,
                    start: start,
                    q: $routeParams.q
                },
                function (data) {
                    $scope.title = data.title;
                    $scope.subject = data.subjects;
                    //$apply是为指定表达式重新同步
                    $scope.totalCount = data.total;
                    $scope.totalPages = Math.ceil($scope.totalCount / count);
                    $scope.loading = true;
                    $scope.$apply();//这里不需要传递参数，因为这里会检查所有的数据模型的值
                }
            );

            //实现上一页和下一页的点击跳转

            $scope.go = function (page) {
                if (page < 1 || page > $scope.totalPages) {
                    return;
                }
                $route.updateParams({page: page});
            };
        }
        ])
    ;
})(angular);
