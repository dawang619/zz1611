
$(function(){
	
	
	//鼠标滑过“全部商品分类”显示分类列表
	(function(){
		
		$(".allclassed").mouseover(function(){
			//alert("111");
			$(".list-classed").removeClass("list-classed-hidden");
		})
		
		$(".list-classed").hover(function(){
			//alert("111");
			$(this).removeClass("list-classed-hidden");	
		},function(){
			$(this).addClass("list-classed-hidden");
		})
		$(".menu-box").hover(function(){
			$(".list-classed").removeClass("list-classed-hidden");
		},function(){
			$(".list-classed").addClass("list-classed-hidden");
		})
	})();
		
	//--------------放大镜
	(function(){
		$(".veg-small-list").on("mouseover","li",function(){
				$(".vegs-img>li").eq($(this).index()).show().siblings().hide();
				$(".vegb-img>li").eq($(this).index()).show().siblings().hide();
			})
			$(".veg-small-list li:first").trigger("mouseover");//模拟鼠标滑入事件
			var rateBig=$(".vegs-img").width()/$(".mask").width*$(".vegs-big").width();
			$(".vegb-big li img").width(rateBig);
			$(".vegb-big li img").height(rateBig);
			
			//鼠标滑入,出现放大镜效果；鼠标滑出，放大镜效果消失
			$(".veg-small").hover(function(){
				$(".mask").show();
				$(".vegb-img").show();
			},function(){
				$(".mask").hide();
				$(".vegb-img").hide();
			})
			//遮罩层随鼠标移动
			$(".vegs-img").mousemove(function(evt){
				var offsetX=evt.pageX-$(".veg-kinds").offset().left-$(".mask").width()/2;
				var offsetY=evt.pageY-$(".veg-kinds").offset().top-$(".mask").height()/2;
				if(offsetX<=0){
					offsetX=0;
				}else if(offsetX>=$(".vegs-img").width()-$(".mask").width()){
					offsetX=$(".vegs-img").width()-$(".mask").width();
				}
				if(offsetY<=0){
					offsetY=0;
				}else if(offsetY>=$(".vegs-img").height()-$(".mask").height()){
					offsetY=$(".vegs-img").height()-$(".mask").height();
				}
				$(".mask").css({"left":offsetX,"top":offsetY});
				//控制大图的移动
				var percent=800/$(".vegb-img").width();
				var bigOffsetX=-offsetX*percent;
				var bigOffsetY=-offsetY*percent;
				$(".vegb-img li").css({
					'left':bigOffsetX,
					'top':bigOffsetY
				})
				//return false;
			})
	})();
	//---------------------获取配送地地址
	(function(){
		$(".veg-scope>i").html($(".city").html());
		//保持配送地址与所选地址一致
		$(".veg-scope>i").click(function(){
			$(".veg-scope>i").html($.cookie("city"));
		})
	})();
	//-------------------------控制物品的加减
	(function(){
		var num=$(".count-visib").html();
		if(num>=1){
			$(".add").css("background","#f5f5f5");
		}
		$(".add").click(function(){
			num++;
			if(num>1){
				$(".reduce").css("background","#f5f5f5");
			}
			$(".count-visib").html(num);
		})
		$(".reduce").click(function(){
			num--;
			if(num>1){
				$(".reduce").css("background","#f5f5f5");
			}
			if(num<=1){
				num=1;
				$(".reduce").css("background","");
			}
			$(".count-visib").html(num);
		})
	})();
	//----------------从JSON获取页面图片信息
	(function(){
		$.getJSON("../data/goos-img.json",function(data){
			//console.log(data);
			var dg=data.donggua;
			for(var i=0;i<dg.length;i++){
				$(".goods-img").append("<img src='"+dg[i]+"'>");
			}
		})
	})();
	//------------------信息选项卡效果
	(function(){
		$(".veg-info-nav").on("click","li",function(){
			$(this).addClass("info-select").siblings().removeClass("info-select");
			$(".info>div").eq($(this).index()).css('display','block').siblings().css('display','none');
		})
	})();

    //-------------------左侧信息导入json
    (function(){
    	$.getJSON("../data/otherlooks.json",function(data){
    		//console.log(dat);
    			var otherslook=data.otherslook;
    			var othersbuy=data.othersbuy;
    			var otherslike=data.otherslike;
    			for(var i=0;i<otherslook.length;i++){
    				$(".others-look").append("<dl class='classed' data-i='otherslook'><dt><img src='"+otherslook[i].img+"'><span><i></i>加入购物车</span></dt><dd><span>"+otherslook[i].price+"</span><a href=''>"+otherslook[i].name+"</a></dd></dl>");
					$(".others-buy").append("<dl class='classed' data-i='othersbuy'><dt><img src='"+othersbuy[i].img+"'><span><i></i>加入购物车</span></dt><dd><span>"+othersbuy[i].price+"</span><a href=''>"+othersbuy[i].name+"</a></dd></dl>");
					$(".others-like").append("<dl class='classed' data-i='otherslike'><dt><img src='"+otherslike[i].img+"'><span><i></i>加入购物车</span></dt><dd><span>"+otherslike[i].price+"</span><a href=''>"+otherslike[i].name+"</a></dd></dl>");
    			}
    		(function(){
    			//鼠标滑过，让购物信息显示,鼠标滑出，信息消失
	    		$(".classed").hover(function(){
	    			$(this).find("dt").find("span").css('display',"block");
	    		},function(){
	    			$(this).find("dt").find("span").css('display',"none");
	    		})
    		})();
    		//左侧物品添加购物车
    		(function(){
    			//把点击的商品的信息加入cookie
    			$(".classed>dt").on("click","span",function(){
	    			//获取点击的商品信息
	    			var index=$(this).parent().parent().index();
	    			var classify = $(this).parent().parent().data("i");
	    			//console.log(classify);//otherslook
					var list=data[classify];//获取点击对象所在数组(如果对象名为变量，获取它的值要用中括号)
					var product=list[index];
	  				//console.log(list);
	    			//console.log(list[index].name);
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
    		})();
    	})
    })();
    //详情页面购物车的实现
    (function(){
    		$.getJSON("../data/list.json",function(data){
    			//console.log(data);
    			//点击加入购物车，改变页面信息
					$(".veg-count>a").click(function(){
						//alert($(".count-visib").html());
						var arr=[];
	    				var count;
	    				//读取页面数量信息
	    				var add=Number($(".count-visib").html());
	    				if($.cookie("info")){
	    					arr=JSON.parse($.cookie("info"));
	    					count=Number($(".floor1").find("span").html());
	    				}else{
	    					count=0;
	    				}
	    					count+=add;
	    				$(".floor1").find("span").css("display","block");
	    				$(".floor1").find("span").html(count);
	    				//改变cookie信息
	    				
	    				//alert(typeof add);
	    				var has=false;
	    				for(var i=0;i<arr.length;i++){
	    					if(data[0].id==arr[i].id){
	    						arr[i].num=Number(arr[i].num)+add;
	    						has=true;
	    					}
	    				}
	    				if(!has){
	    					data[0].num=add;
	    					arr.push(data[0]);
	    				}
		    			var str=JSON.stringify(arr);
		  				$.cookie("info",str,{"expires":7,"path":"/"});
		  				//console.log($.cookie("info"));
					})
    			})
    		})();
    			
})