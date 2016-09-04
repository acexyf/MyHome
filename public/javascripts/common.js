$(function(){
	var flag=false;
	$('.logined').on('click',function(e){
		$('.dropList').toggleClass('none');
	});
	$(document).on('click',function(e){
		if($(e.target).attr('class')=='headImg' || $(e.target).attr('class')=='tri')
			return;
		$('.dropList').addClass('none');
	});
})