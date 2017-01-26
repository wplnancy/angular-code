/**
 * Created by Administrator on 2017/1/26.
 */


(function (angular) {
    angular.module('moviecat.directives.auto_focus', [])
        .directive('autoFocus', ['$location', function ($location) {
            //var path = $location.path();
            //自定义指令
            return {
                restrict: 'A',
                link: function (scope, iEle) {
                    scope.$location = $location;
                    //时刻的监视location.path()的变化
                    scope.$watch('$location.path()', function (now) {
                        var aLink = iEle.children().attr('href');
                        var type = aLink.replace(/#(\/.+?)\/\d+/, '$1');
                        // console.log(type);
                        if (now.startsWith(type)) {
                            iEle.parent().children().removeClass('active');
                            iEle.addClass('active');
                        }
                    });


                    //如果监视了url的变化的话，就没有必要再绑定点击事件了
                    /*   iEle.on('click', function () {
                     //先清除所有的
                     iEle.addClass('active');
                     })*/

                }
            }

        }]);

})(angular);