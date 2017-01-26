/**
 * Created by Administrator on 2017/1/26.
 */


(function (angular) {
    angular.module('moviecat.directives.auto_focus', [])
        .directive('autoFocus', ['$location', function ($location) {
            var path = $location.path();
            //自定义指令
            return {
                restrict: 'A',
                link: function (scope, iEle) {
                    var aLink=iEle.children().attr('href');
                    var type = aLink.replace(/#(\/.+?)\/\d+/, '$1');
                    console.log(type);
                    if (path.startsWith(type)) {
                        iEle.addClass('active');
                    }
                    iEle.on('click', function () {
                        //先清除所有的
                        iEle.parent().children().removeClass('active');
                        iEle.addClass('active');
                    })

                }
            }

        }]);

})(angular);