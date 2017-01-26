'use strict';
(function (angular) {
	angular.module('myApp.in_theaters', ['ngRoute'])
		.config(['$routeProvider', function ($routeProvider) {
			$routeProvider.when('/in_theaters', {
				templateUrl: 'in_theaters/view.html',
				controller: 'inTheatersController'
			});
		}])

		.controller('inTheatersController', ['$scope', '$http', 'HttpService', function ($scope, $http, HttpService) {
			$scope.subject = [];
			$scope.message = '';
			$scope.totalCount = 0;
			var doubanApiAddress = 'http://api.douban.com/v2/movie/coming_soon';
			HttpService.jsonp(
				doubanApiAddress,
				{
					"count": 10,
					"start": 5
				},
				function (data) {
					$scope.subject = data.subjects;
					//$apply是为指定表达式重新同步
					$scope.totalCount = data.total;
					$scope.$apply();//这里不需要传递参数，因为这里会检查所有的数据模型的值
				}
			);


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


		}]);
})(angular);
