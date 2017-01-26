'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.movie_detail',
    'moviecat.services.http',
    'moviecat.directives.auto_focus',
    'myApp.moviecat'
])//constant是用来定义模块中的一些常量的
    .constant('APPConfig', {
        page_size: 10,
        listApiAddress: 'http://api.douban.com/v2/movie/',
        detailApiAddress: 'http://api.douban.com/v2/movie/subject/'
    })
    .config(['$routeProvider', function ($routeProvider) {
        //指定默认请求的是第一页
        $routeProvider.otherwise({redirectTo: '/in_theaters/1'});
    }])

    .controller('SearchController', ['$scope', '$route', function ($scope, $route) {
        $scope.input = '';
        $scope.search = function () {
            //修改category的参数
            $route.updateParams({category: 'search', q: $scope.input});
        };
    }])
    .controller('navController', ['$scope', '$location', function ($scope, $location) {
        $scope.$location = $location;
        $scope.$watch('$location.path()', function (now) {
            if (now.startsWith('/in_theaters')) {
                $scope.type = 'in_theaters';
            } else if (now.startsWith('/coming_soon')) {
                $scope.type = 'coming_soon';
            } else if (now.startsWith('/top250')) {
                $scope.type = 'top250';
            }
        })
    }]);
