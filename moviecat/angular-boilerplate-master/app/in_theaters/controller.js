'use strict';
(function (angular) {
    angular.module('myApp.in_theaters', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/in_theaters/:page', {
                templateUrl: 'in_theaters/view.html',
                controller: 'inTheatersController'
            });
        }])

        .controller('inTheatersController', ['$scope', '$http', '$route', '$routeParams', 'HttpService', function ($scope, $http, $route, $routeParams, HttpService) {
            var count = 10;
            var page = parseInt($routeParams.page);
            var start = (page - 1) * count;
            $scope.totalPages = 0;
            $scope.subject = [];
            $scope.title = '';
            $scope.message = '';
            $scope.totalCount = 0;
            $scope.currentPage = page;
            $scope.loading = "Loading...";
            var doubanApiAddress = 'http://api.douban.com/v2/movie/in_theaters';
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


            /*
             $http({
             method: 'GET',
             url: '../app/data.json'
             }).then(function successCallback(res) {
             //此处的代码是在请求完成之后才执行的代码  因为ajax请求是异步回调的
             if (res.status === 200) {
             $scope.subject = res.data;
             } else {
             $scope.message = '请求数据错误';
             }
             }, function errorCallback(err) {
             console.log(err);
             $scope.message = '请求数据错误';
             });*/


        }
        ])
    ;
})(angular);
