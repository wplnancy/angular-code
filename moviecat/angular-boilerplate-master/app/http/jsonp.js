/**
 * Created by Administrator on 2017/1/25.
 */
(function (window, document) {
	function jsonp(url, data, callback) {
		// 步骤
		/*
		 1、将data转换为字符串的形式
		 2、处理url中的回调函数
		 3. 创建一个script标签
		 4.挂载回调函数
		 5 强script标签放到页面中
		 */

		function formatData(obj) {
			if (Object.prototype.toString.call(obj) !== '[object Object]') {
				return;
			}
			var res = '';
			for (var key in obj) {
				res += key + '=' + obj[key];
				res += '&';
			}
			return res;
		}

		var cbFunName = 'my_json_cb_' + Math.random().toString().replace('.', '');

		window[cbFunName] = callback;

		//格式化问号传参的数据
		var querystring = formatData(data);

		querystring += 'callback=' + cbFunName;

		//创建script标签
		var scriptElement = document.createElement('script');
		url += url.indexOf('?') >= 0 ? '&' : '?';//判断原来的字符串是否存在?号
		scriptElement.src = url + querystring;

		// 将script标签放到页面中
		document.body.appendChild(scriptElement);


	};
	window.$jsonp = jsonp;

})(window, document);
