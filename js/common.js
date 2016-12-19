$(function(){
		//---------------------------------返回楼层
		(function(){
			$(window).scroll(function(){
				var scrollTop=$(document).scrollTop();
				if(scrollTop>=700){
					$(".floor6").css("display","block");
				}else{
					$(".floor6").css("display","none");
				}
			})
			//点击floor6回到顶部；
			$(".floor6").click(function(){
				$("html,body").animate({"scrollTop":"0"});
			})
			
		})();
	//---------------------------------城市选择
		(function(){
			//点击城市的时候出现城市选择
				$(".city").click(function(){
					//alert("111");
					$(".covers").show().find(".city-select").css("display","block").animate({'top':350},500);
				})
				//点击关闭按钮，隐藏选择
				$(".consign>a").click(function(){
					$(".covers").hide().find(".city-select").css("top","0").hide();
				})
		})();
	//-----------------------在城市列表中添加json
		(function(){
			$.getJSON("../data/city.json",function(data){
				var city=data.city;
				for(var i in city){
					$span=$("<span></span>");
					$li=$("<li><strong>"+i+"：</strong></li>");					
					for(var j=0;j<city[i].length;j++){
						$a=$("<a href=''>"+city[i][j]+"</a>");
						$span.append($a);
						$li.append($span);
					}
					$(".inland").append($li);
				}
				//城市列表隔行换色
				$(".inland>li:odd").css('background','#f3f2f2');
				//添加点击事件，选择送货城市所在地并显示在city中
				$(".inland li").find("span").on('click',"a",function(e){
				var html="";
				if($(this).html()=="北京"){
					html=$(this).html()+"：东城区";
				}else if($(this).html()=="上海"){
					html=$(this).html()+"：黄浦区";
				}else if($(this).html()=="天津"){
					html=$(this).html()+"：和平区";
				}
				else{
					html=$(this).parent().prev().html()+$(this).html();
				}
				$(".city").html(html);
				//把获取的城市地址存入cookie
				$.cookie("city",html,{"expires":7,"path":"/"});
				//console.log($.cookie("city"));
				e.preventDefault();//阻止默认跳转行为
				$(".consign>a").trigger('click');//模拟关闭窗口效果
			})
			
				
			})
		})();
	//从cookie中读取city信息
	(function(){
		if($.cookie("city")){
			$(".city").html($.cookie("city"));
		}else{
			$(".city").html("北京：东城区");
		}
	})();
	//-----------------------点击时改变箭头方向
		(function(){
			$(".score>a").click(function(){
				//点击时改变箭头方向
				if($(this).hasClass("up")){
					$(this).removeClass("up");
				}else{
					$(this).addClass("up");
				}
				//点击时显示相应的块元素
				if($(".others").hasClass("block")){
					$(".others").removeClass("block").siblings().addClass("block");
				}else{
					$(".others").addClass("block").siblings().removeClass("block");
				}
			})
		})();
	//-------------------------------nav meu
	(function(){
			//鼠标滑过列表项显示对应的块
			$(".list-classed>li").mouseenter(function(){
				$(".menu-box").css('display','block');
				$(".menu").eq($(this).index()).addClass("menu-visib").siblings().removeClass("menu-visib");
			})
			$(".list-classed>li").mouseleave(function(){
				$(".menu-box").css('display','none');
					
			})
			$(".menu").mouseenter(function(){
				$(".menu-box").css('display','block');
				$(this).addClass("menu-visib").siblings().removeClass("menu-visib");
			})
			$(".menu").mouseleave(function(){
				$(".menu-box").css('display','none');
			})
			//控制nav部分menu的划过事件
			$(".list-classed li").hover(function(){
				$(this).addClass("li-hover-style");
				$(this).find("a").stop().animate({"paddingLeft":"6"});
			},function(){
				$(this).removeClass("li-hover-style");
				$(this).find("a").stop().animate({"paddingLeft":"0"});
			}
					
			)
	})();
	//读取cookie中的数量信息，显示在购物车侧栏上
    		(function(){
    			if($.cookie("info")){
	    			arr=JSON.parse($.cookie("info"));
	    			var count=0;
	    			for(var i=0;i<arr.length;i++){
	    				count+=arr[i].num;
	    			}
	    			$(".floor1").find("span").css("display","block").html(count);
	    			}
    			else{
    				$(".floor1").find("span").css("display","none");	
    			}
    		})();
	

	
})