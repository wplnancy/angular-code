/**
 * Created by Administrator on 2017/1/18.
 */
var arr = [
    {id: 1, name: "angular"},
    {id: 2, name: "node"},
    {id: 3, name: "react"},
    {id: 4, name: "vue"}
];

//filter会返回一个过滤之后的新数组  删除第四个
var newAry = arr.filter(function (item) {
    return item.id === 4 ? false : true;
});