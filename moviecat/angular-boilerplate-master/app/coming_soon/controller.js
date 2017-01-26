'use strict';

angular.module('myApp.coming_soon', ['ngRoute'])

	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/coming_soon', {
			templateUrl: 'coming_soon/view.html',
			controller: 'comingSoonController'
		});
	}])

	.controller('comingSoonController', [function () {

	}]);
