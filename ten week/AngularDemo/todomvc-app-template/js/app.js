(function (angular) {
	'use strict';

	/**
	 * MyTodoMvc Module
	 *
	 * 应用程序的主要的模块
	 *   根据界面原型  抽象数据成员
	 *
	 */
	var myApp = angular.module('MyTodoMvc', ['ngRoute']);
	// 路由配置
	myApp.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
		// /asdasda {status:asdasda}
			.when('/:status?', {
				controller: 'MainController',
				templateUrl: 'main_tmpl'
			})
			.otherwise({redirectTo: '/'});
	}]);

	myApp.controller('MainController', ['$scope', '$route', '$location', '$routeParams', function ($scope, $route, $location, $routeParams) {

		$scope.text = '';
		$scope.todos = [
			{
				id: 1,
				text: '学习',
				completed: false
			},
			{
				id: 2,
				text: '睡觉',
				completed: false
			},
			{
				id: 3,
				text: '打豆豆',
				completed: true
			}];

		function getId() {
			var id = Math.random();
			angular.forEach($scope.todos, function (item) {
				if (item.id === id) {
					id = getId();
					return false
				}
			});
			return id;
		}

		// 添加todo
		$scope.add = function () {
			if ($scope.text === '') {
				return;
			}
			$scope.todos.push({
				id: getId(),
				text: $scope.text,
				completed: false
			});
			$scope.text = '';
		};


		//清空已经完成的任务
		$scope.clear = function () {
			//  使用splice会有数组塌陷的问题  也可以使用一个新数组的

			//filter返回的是一个新的数组
			var ary = $scope.todos.filter(function (item) {
				return !item.completed;
			});
			$scope.todos = ary;
		};

		//是否有已经完成的
		$scope.exitCompleted = function () {
			//返回一个boolean  值
			var hasCom = $scope.todos.find(function (item) {
				return item.completed === true;

			});
			return hasCom === undefined ? false : true;

		};


		//删除某一项
		$scope.remove = function (id) {
			angular.forEach($scope.todos, function (item, index) {
				if (item.id == id) {
					$scope.todos.splice(index, 1);
				}
			});
		};


		//当前正在编辑的哪一个元素   属于界面逻辑    页面逻辑一定是可以抽象为可以复用的

		$scope.currentEditingId = -1;
		$scope.editing = function (id) {
			$scope.currentEditingId = id;
		};

		//按 Enter  停止编辑的  当前页面中没有可编辑的
		$scope.save = function () {
			$scope.currentEditingId = -1;
		};


		//切换全选和全不选的样式
		var now = true;
		$scope.toggleAll = function () {
			angular.forEach($scope.todos, function (item) {
				item.completed = now;
			});
			now = !now;
		};


		//状态的切换

		//路由的是实现的方式   如果有很多种的方式 ，这样写起来很费劲，于是我们可以使用路由
		//自定义比较
		$scope.equalCompare = function (source, target) {
			//返回值是true的话要求内容和大小写都要完全一致才会匹配
			return source === target;
		};

		//根据路由的值做相对应的调整


		// ps:这里不需要使用  $watch  的原因是  当url地址改变的时候，控制器会重新的执行这段代码

		//$scope.selector = {}; // {} {completed:true} {completed:false}
		// 取路由中匹配出来的数据
		var status = $routeParams.status;
		switch (status) {
			case 'active':
				$scope.selector = {completed: false};
				break;
			case 'completed':
				$scope.selector = {completed: true};
				break;
			default:
				// sdfsdf
				//$route.updateParams({ status: '' });
				$scope.selector = {};
				break;
		}
	}]);


})(angular);
