$(function(){
	

	//----------------------------------------banner轮播图
		(function(){
			var count=0;
			var timer=null;
			//设置轮播的相应函数
			function changeTo(){ 
				if(count<$(".pic li").length-1){
					count++;
				}else{
					count=0;
				}
				$(".pic li").eq(count).fadeIn().siblings().fadeOut();
			    $(".num").find("li").removeClass("ones").eq(count).addClass("ones");
   			}
			timer=setInterval(changeTo,3000);
			//鼠标划入，停止轮播，且显示按钮
			$(".banner").mouseenter(function(){
				clearInterval(timer);
				$(".pre").show();
				$(".next").show();
				
			})
			//鼠标划出，继续轮播
			$(".banner").mouseleave(function(){
				$(".pre").hide();
				$(".next").hide();
				timer=setInterval(changeTo,3000);
			})
			//鼠标移动到下标处变换相应图片
			$(".num li").mouseenter(function(){
				//console.log("111");
				clearInterval(timer);
				$(this).addClass("ones").siblings().removeClass("ones");
				count=$(this).index();
				//console.log(count);
				$(".pic li").eq(count).stop().fadeIn().siblings().stop().fadeOut();
			})
			//鼠标移出继续轮播
//			$(".num li").mouseleave(function(){
//				console.log(count);
//				timer=setInterval(changeTo,3000);
//			})
			
			//点击上一个的按钮，自动跳转前一张图片
			$(".pre").click(function(){
				clearInterval(timer);
				count--;
				if(count<=-1){
					count=8;
				}
				$(".num li").eq(count).addClass("ones").siblings().removeClass("ones");
				$(".pic li").eq(count).stop().fadeIn().siblings().stop().fadeOut();
			})
			//点击下一个的按钮，自动跳转下一张图片
			$(".next").click(function(){
				clearInterval(timer);
				count++;
				if(count>=9){
					count=0;
				}
				$(".num li").eq(count).addClass("ones").siblings().removeClass("ones");
				$(".pic li").eq(count).stop().fadeIn().siblings().stop().fadeOut();
			})
		})();
	//--------------------------------------selected轮播
		(function(){
			var count=0;
			var timer1=null;
			$(".sel-screen").append($(".sel1").clone());
			timer1=setInterval(autoPlay,3000);
			function autoPlay(){
				count++;
				if(count==3){
					count=1;
					$(".sel-screen").css('left',0);
				}
				$(".sel-screen").animate({'left':-count*$(".sel1").width()},1000);
			};
			//点击前一个显示相应的列表
			$(".sel-pre").click(function(){
				clearInterval(timer1);
				count--;
				if(count<=-1){
					count=1;
					$(".sel-screen").css('left',-2*$(".sel1").width());
				}
				$(".sel-screen").stop().animate({'left':-count*$(".sel1").width()},1000);
			})
			//点击下一个显示相应的列表
			$(".sel-next").click(function(){
				clearInterval(timer1);
				count++;
				if(count>=3){
					count=1;
					$(".sel-screen").css('left',0);
				}
				$(".sel-screen").stop().animate({'left':-count*$(".sel1").width()},1000);
			})
			//当鼠标滑过，图片左移；
			$(".sel-screen li").mouseenter(function(){
				clearInterval(timer1);
				$(this).animate({'paddingLeft':'6px'});
			})
			//当鼠标离开，图片恢复；
			$(".sel-screen li").mouseleave(function(){
				timer1=setInterval(autoPlay,3000);
				$(this).animate({'paddingLeft':'0'});
			})
		})();
	//--------------------------------------------------导入json数据
		(function(){
			$.getJSON("../data/tuotuo.json",function(data){
				var arr=[];//添加一个空数组
				for(var i in data){
					arr.push(data[i]);//在arr中存放json对象[fruit,meat,seafood,.....]
				}
				//console.log(arr);
				//遍历每一个veg-left;把图片放入对应的块元素
				$(".veg-left").each(function(j){
					$(this).html("<a href=''><img src="+arr[j].photo+"></a>")
					//console.log(arr[j].privilege);
				})
				//console.log(arr.length)
				//遍历arr数组,获取每一个对象
				for(var j=0;j<arr.length;j++){
					//console.log(j);
					//获取对象的privilege;
					var priv=arr[j].privilege;
					var org=arr[0].organic;
					var dom=arr[0].domestic;
					var imp=arr[0].import;
					var egs=arr[1].eggs;
					var mts=arr[1].meats;
					var foz=arr[1].fozens;
					var fish=arr[2].fishs;
					var shrimp=arr[2].shrimp;
					var crab=arr[2].crab;
					var cure=arr[3].cure;
					var rice=arr[4].rice
					var cereal=arr[4].cereal
					var flavor=arr[4].flavor
					var sock=arr[5].sock
					//console.log(priv)
					//遍历每一个privilege;把每一个privilege的属性添加给每一个元素
						
						$(".veg-favor").eq(j).find(".classfity").each(function () {
							//console.log(j)	
							for(var t=0;t<priv.length;t++){								
								$(".veg-favor").eq(j).find(".classfity").eq(t).html("<dt><img src='"+priv[t].img+"'></dt><dd><a href=''>"+priv[t].name+"</a><strong>"+priv[t].price+"</strong></dd>");
							
							}
						})
						for(var t=0;t<org.length;t++){
							$(".organic").append("<dl class='classfity'><dt><img  data-original='"+org[t].img+"'></dt><dd><a href=''>"+org[t].name+"</a><strong>"+org[t].price+"</strong></dd></dl>");
							$(".domestic").append("<dl class='classfity'><dt><img  data-original='"+dom[t].img+"'></dt><dd><a href=''>"+org[t].name+"</a><strong>"+org[t].price+"</strong></dd></dl>");
							$(".import").append("<dl class='classfity'><dt><img  data-original='"+imp[t].img+"'></dt><dd><a href=''>"+imp[t].name+"</a><strong>"+imp[t].price+"</strong></dd></dl>");
							$(".eggs").append("<dl class='classfity'><dt><img  data-original='"+egs[t].img+"'></dt><dd><a href=''>"+egs[t].name+"</a><strong>"+egs[t].price+"</strong></dd></dl>");
							$(".meats").append("<dl class='classfity'><dt><img  data-original='"+mts[t].img+"'></dt><dd><a href=''>"+mts[t].name+"</a><strong>"+mts[t].price+"</strong></dd></dl>");
							$(".fozens").append("<dl class='classfity'><dt><img  data-original='"+foz[t].img+"'></dt><dd><a href=''>"+foz[t].name+"</a><strong>"+foz[t].price+"</strong></dd></dl>");
							$(".fishs").append("<dl class='classfity'><dt><img  data-original='"+fish[t].img+"'></dt><dd><a href=''>"+fish[t].name+"</a><strong>"+fish[t].price+"</strong></dd></dl>");
							$(".shrimp").append("<dl class='classfity'><dt><img  data-original='"+shrimp[t].img+"'></dt><dd><a href=''>"+shrimp[t].name+"</a><strong>"+shrimp[t].price+"</strong></dd></dl>");
							$(".crab").append("<dl class='classfity'><dt><img  data-original='"+crab[t].img+"'></dt><dd><a href=''>"+crab[t].name+"</a><strong>"+crab[t].price+"</strong></dd></dl>");
							$(".cure").append("<dl class='classfity'><dt><img  data-original='"+cure[t].img+"'></dt><dd><a href=''>"+cure[t].name+"</a><strong>"+cure[t].price+"</strong></dd></dl>");
							$(".rice").append("<dl class='classfity'><dt><img  data-original='"+rice[t].img+"'></dt><dd><a href=''>"+rice[t].name+"</a><strong>"+rice[t].price+"</strong></dd></dl>");
							$(".cereal").append("<dl class='classfity'><dt><img  data-original='"+cereal[t].img+"'></dt><dd><a href=''>"+cereal[t].name+"</a><strong>"+cereal[t].price+"</strong></dd></dl>");
							$(".flavor").append("<dl class='classfity'><dt><img  data-original='"+flavor[t].img+"'></dt><dd><a href=''>"+flavor[t].name+"</a><strong>"+flavor[t].price+"</strong></dd></dl>");
							$(".sock").append("<dl class='classfity'><dt><img  data-original='"+sock[t].img+"'></dt><dd><a href=''>"+sock[t].name+"</a><strong>"+sock[t].price+"</strong></dd></dl>");
							
						}
						
				}
				//懒加载
				$(".classfity>dt").find("img").lazyload({
					effect:"fadeIn"
				})
			})
		})();


//-------------------------------------------------7个选项卡
		(function(){
			$(".veg-list").each(function(i){
				$(this).on("mouseenter","li",function(){
					$(this).addClass("select"+i).siblings().removeClass("select"+i);
					$(this).parent().parent().next().find(".veg-right").children().eq($(this).index()).css('display','block').siblings().css('display','none');
				})
			})
		})();

//--------------------------------------------竖排切换
		(function(){
			$(".rec-top").on("mouseenter","li",function(){
				$(this).find("div").addClass("list-hidden").siblings().removeClass("list-hidden");
			})
			$(".rec-top").on("mouseleave","li",function(){
				$(this).find("dl").addClass("list-hidden").siblings().removeClass("list-hidden");
			})
		})();

})
