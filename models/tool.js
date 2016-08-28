module.exports = function() {
	// FormatDate();
	StringToDate();
	StringSplit();
}

/**
 * 格式化日期
 * 实例：new Date().Format("yyyy-MM-dd hh:mm:ss") ==> 2016-09-16 22:22:22
 */
function FormatDate() {
	Date.prototype.Format = function(fmt) { //author: meizz 
		var o = {
			"M+": this.getMonth() + 1, //月份   
			"d+": this.getDate(), //日   
			"h+": this.getHours(), //小时   
			"m+": this.getMinutes(), //分   
			"s+": this.getSeconds(), //秒   
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度   
			"S": this.getMilliseconds() //毫秒   
		};
		if (/(y+)/.test(fmt))
			fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt))
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	}
}

/**
 * string类型变成日期
 * '1471786011401'.toDate("yyyy-MM-dd hh:mm:ss") ==> 2016-08-21
 */
function StringToDate() {
	String.prototype.toDate = function(fmt = "yyyy-MM-dd") {
		var that = new Date(parseInt(this));
		var o = {
			"M+": that.getMonth() + 1, //月份   
			"d+": that.getDate(), //日   
			"h+": that.getHours(), //小时   
			"m+": that.getMinutes(), //分   
			"s+": that.getSeconds(), //秒   
			"q+": Math.floor((that.getMonth() + 3) / 3), //季度   
			"S": that.getMilliseconds() //毫秒   
		};
		if (/(y+)/.test(fmt))
			fmt = fmt.replace(RegExp.$1, (that.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt))
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	}
}

/**
 * string类型分隔
 */
function StringSplit() {
	String.prototype.splitWith = function(symbol = ',') {
		let arr = this.split(symbol);
		return arr.join(' ');
	}
}