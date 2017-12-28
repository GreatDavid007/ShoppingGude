$(function(){
	$('#open').on('click',function(){
		zdconfirm(' ','你确认提交该条数据吗',function(r){
			if(r){
				console.log(123);
			}
		})
	})
})