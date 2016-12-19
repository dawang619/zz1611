$(function(){
			(function(){
				//从cookie读取所在省份信息
				if($.cookie("city")){
					$(".shop-nav>li").html($.cookie("city").substring(0,2)+"站");
				}else{
					$(".shop-nav>li").html("北京站");
				}
			})();
			(function(){
				if($.cookie("info")){
					var product=JSON.parse($.cookie("info"));
					//console.log(product);
					//从cookie中读取购物车信息
					for(var i=0;i<product.length;i++){
						var singleprice=parseFloat((product[i].price).substring(1));
						//alert(singleprice);
						$(".info-goods").append("<div class='info-product'><span class='info-select single-select'><input type='checkbox'/></span><dl class='info-name'><dt><img src='"+product[i].img+"'/></dt><dd>"+product[i].name+"</dd></dl><span class='info-status'>有货</span><span class='info-price'>"+product[i].price+"</span><span class='info-count'>"+product[i].num+"</span><span class='info-value'>￥"+((product[i].num)*singleprice).toFixed(2)+"</span><span class='info-del'><input type='button' value='删除'/></span></div>");
					
					}
					//全选
					if($(".all-select>input").is(":checked")){
						$("input[type='checkbox']").prop("checked",true);
					}
					(function(){
						$(".all-select>input").click(function(){
							//alert($(this).prop("checked"));
							if($(this).is(":checked")){
								$("input[type='checkbox']").prop("checked",true);
								}
							else{
								$("input[type='checkbox']").prop("checked",false);
							}
						})
						
					})();
				}
			})();
			(function(){
				$(".info-product span").on("click","input[type='button']",function(){
					
					//删除cookie信息
					var index=$(this).parent().parent().index();
					//alert(index);
					var arr=JSON.parse($.cookie("info"));
					arr.splice(index,1);
					$.cookie("info",JSON.stringify(arr),{"expires":7,"path":"/"});
					//删除页面信息
					$(this).parent().parent().remove();
					//修改商品总金额
					payCount();
				})
			})();
			
			//清除购物车
			(function(){
				$(".total-left>a").click(function(){
					//删除页面信息
					$(".shop-content").css("display","none");
					$(".shop-count").css("display","none");
					$(".shop-hidden").css("display","block");
					//删除cookie信息
					$.cookie("info","",{"expires":-1,"path":"/"});
				})
			})();
			(function(){
				$(".count-now").click(function(){
					window.location.href="../html/submit.html"; 
				})
			})();
			
			payCount();
})
			//从cookie获取商品信息，计算总额
			function payCount(){
				if($.cookie("info")){
					var product=JSON.parse($.cookie("info"));
					var count=0;
					for(var i=0;i<product.length;i++){
					 count+=(product[i].num)*(product[i].price.substring(1));
					 
					}
					$(".total-right>span").html("￥"+count.toFixed(2));
				}
				else{
					$(".total-right>span").html("￥00.00");
				}
			}