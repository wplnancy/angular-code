/**
 * Created by Administrator on 2017/1/20.
 */
//这是要执行的函数
var greet = function (words, school) {
    console.log(words.text);
    console.log(school.student);
};
//但是还是有问题，当传入的是另个参数的话，就要修改正则
//就相当于我们的对象库，里面存放着所有能够注入的对象和服务
var registry = {
    words: {
        text: 'hello'
    },
    school: {
        student: 'wpl'
    }
};
//自动注入服务对象并且运行里面的函数
var inject = function (func) {
    //这样就写死了  我们要分析方法的参数
    var source = func.toString();//转换为字符串进行匹配
    var matches = source.match(/function\s?\((\w+),\s*?(\w+)?\)/);
    console.log(matches);
    var argnames = matches.slice(1);//去掉匹配的第一个
    var args = [];
    for (var i = 0; i < argnames.length; i++) {
        var argObj = registry[argnames[i]];
        args.push(argObj);
    }
    func.apply(null, args);
};
inject(greet);
