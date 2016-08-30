$(function(){
	var version=10;
	$('.input-code img').on('click',function(){
		$(this).attr('src','/verifyCode?v='+version);
		version+=10;
	});
})