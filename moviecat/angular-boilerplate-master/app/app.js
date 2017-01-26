'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
	'ngRoute',
	'moviecat.services.http',
	'myApp.coming_soon',
	'myApp.in_theaters',
	'myApp.top_250'

]).config(['$routeProvider', function ($routeProvider) {
	$routeProvider.otherwise({redirectTo: '/coming_soon'});
}]);
