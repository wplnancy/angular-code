'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
	'ngRoute',
	'moviecat.services.http',
'myApp.coming_soon',
    'myApp.in_theaters',
    'myApp.top_250'

]).config(['$routeProvider', function ($routeProvider) {
	//指定默认请求的是第一页
    $routeProvider.otherwise({redirectTo: '/in_theaters/1'});
}]);
