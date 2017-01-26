'use strict';

angular.module('myApp.top_250', ['ngRoute'])

	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/top_250', {
			templateUrl: 'top_250/view.html',
			controller: 'top250Controller'
		});
	}])

	.controller('top250Controller', [function () {

	}]);
