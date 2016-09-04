var bgIndex=$('#bgIndex').val();
$.backstretch("../public/images/bg/"+bgIndex+".jpg",{speed:500});
var likes={
	wrap:null,
	id:-1,
	count:-1,
	init:function(){
		var that=this;
		this.wrap=$('.like');
		this.id=this.wrap.data('id');
		this.count=$('.likes-count span',this.wrap).html();
		this.wrap.on('click',function(){
			if($(that.wrap).hasClass('disabled'))
				return;
			$.ajax({
				url:'/addLike',
				dataType:'json',
				type:'post',
				data:{
					id:that.id,
					count:that.count
				},
				success:function(data){
					if(data && data.status){
						$(that.wrap).addClass('disabled');
						var temp_count=$('.likes-count span',this.wrap).html()
						$('.likes-count span',this.wrap).html(parseInt(temp_count)+1)
					}
				}
			});
		});
	}
}
likes.init();