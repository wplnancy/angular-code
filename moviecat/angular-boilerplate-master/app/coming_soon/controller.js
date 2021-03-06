
'use strict';
(function (angular) {
    angular.module('myApp.coming_soon', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/coming_soon/:page', {
                templateUrl: 'coming_soon/view.html',
                controller: 'comingSoonController'
            });
        }])

        .controller('comingSoonController', ['$scope', '$http', '$route', '$routeParams', 'HttpService', function ($scope, $http, $route, $routeParams, HttpService) {
            var count = 10;
            var page = parseInt($routeParams.page);
            var start = (page - 1) * count;
            $scope.totalPages = 0;
            $scope.subject = [];
            $scope.title = '';
            $scope.message = '';
            $scope.totalCount = 0;
            $scope.currentPage = page;
            $scope.loading = false;
            var doubanApiAddress = 'http://api.douban.com/v2/movie/coming_soon';
            HttpService.jsonp(
                doubanApiAddress,
                {
                    count: count,
                    start: start
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
