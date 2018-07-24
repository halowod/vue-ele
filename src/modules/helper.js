// 公共函数


/**
 * 获取当天日期
 * @return {String} 返回日期
 */
export const getDate = function(){
	let date = new Date();
	let formatDate = `${date.getFullYear()}-${fillZero(date.getMonth() + 1, 2)}-${fillZero(date.getDate(), 2)}`;
	return formatDate;
};