$(function(){
	//二级菜单
	(function(){
		
			$(".list-kinds>li").not(":first").click(function(){
				//alert("111");
				//判断是否隐藏
				if($(this).find(".inner-list").css("display")=="none"){
					$(this).css("background-image","url(../img/i_arrow_d.png)");
					$(this).find(".inner-list").css("display","block");
				}else{
					$(this).css("background-image","url(../img/i_arrow_dl.png)");
					$(this).find(".inner-list").css("display","none");
				}
				
			})
	})();
	//从json获取数据
	(function(){
		$.getJSON("../data/list.json",function(data){
			//console.log(data);
			var html="";
			for(var i=0;i<data.length;i++){
				html="<dl class='list-vegs'><dt><img src='"+data[i].img+"'/></dt><dd><a href='../html/veg.html'><i>"+data[i].brand+"</i>"+data[i].name+"</a><span>"+data[i].price+"</span><strong><i>有货</i><span>已有<em>1000</em>条评论</span></strong><p>加入购物车</p></dd></dl>"
				$(".list-origan").append(html);
			}
			//鼠标滑过，边框变色，背景变色
			$(".list-vegs").hover(function(){
				$(this).css({
					"background":"#fafafa",
					"border-color":"#ff3300"
				});
			},function(){
				$(this).css({
					"background":"",
					"border-color":"#ccc"
				});
			})
			//点击“加入购物车”保存点击的物品信息到cookie
			$(".list-vegs>dd").on("click","p",function(){
				//获取点击的物品信息
				var index=$(this).parent().parent().index();//获取点击对象那个的数组下标；
				//console.log(index);
				var product=data[index];
				//console.log(product);
				//获取cookie中的信息
				//console.log($.cookie("info"));
				var arr=[];
				var count;
	    		if($.cookie("info")){
	    			arr=JSON.parse($.cookie("info"));
	    			count=$(".floor1").find("span").html();	    				
	    		}else{
	    			count=0;
	    		}
	    		count++;
	    		$(".floor1").find("span").css("display","block");
	    		$(".floor1").find("span").html(count);
	    		//判断购物车中有没有相同的商品，若有，数量++；
	    			var has=false;
	    			for(var i=0;i<arr.length;i++){
	    				var item=arr[i];
	    				if(item.id==product.id){
	    					item.num++;
	    					has=true;
	    				}
	    			}
	    			if(!has){
	    				product.num=1
	    				arr.push(product);
	    			}
	    			var str=JSON.stringify(arr);
	  				$.cookie("info",str,{"expires":7,"path":"/"});
	  				//console.log($.cookie("info"));
			})
		})
		
	})();

	
})
