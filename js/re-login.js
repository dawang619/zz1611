//验证手机号
function validatephone(){
	
	if($(".reg-phone").val()==""){
		$(".reg-box").eq(0).find("div").html('<span class="error-style">手机号不能为空</span>');
		$(".reg-phone").css({"border-color":"#f97d7d","background":"url(../img/tc_no.png) no-repeat 333px center"});
		return ;
	}
	else{
		if(!(/^1[34578]\d{9}$/.test($(".reg-phone").val()))){
			$(".reg-box").eq(0).find("div").html('<span class="error-style">手机号格式不正确，请重新输入</span>');
			$(".reg-phone").css({"border-color":"#f97d7d","background":"url(../img/tc_no.png) no-repeat 333px center"});
			
			return ;
		}else{
			$(".reg-box").eq(0).find("div").html('');
			$(".reg-phone").css({"border-color":"#37bd83","background":"url(../img/tc_yes.png) no-repeat 333px center"});
			return true;
		}
	}
}

//验证密码格式
function validatePass(){
	var $password1=$(".reg-pass1").val();
	if($password1 == ""){
		$(".reg-box").eq(1).find("div").html('<span class="error-style">请输入密码</span>');
		$(".reg-pass1").css({"border-color":"#f97d7d","background":"url(../img/tc_no.png) no-repeat 333px center"});
		return;
	}else{
		if(!(/^[A-Za-z0-9_]{6,20}$/.test($password1.trim()))){
			$(".reg-box").eq(1).find("div").html('<span class="error-style">6-20个字符内，使用字母、数字或符号，区分大小写</span>');
			$(".reg-pass1").css({"border-color":"#f97d7d","background":"url(../img/tc_no.png) no-repeat 333px center"});
			return;
		}else{
			$(".reg-box").eq(1).find("div").html('');
			$(".reg-pass1").css({"border-color":"#37bd83","background":"url(../img/tc_yes.png) no-repeat 333px center"});
			return true;
		}
	}
}

//验证再次确认密码
function validatePass1(){
	var $password1=$(".reg-pass1").val();
	var $password2=$(".reg-pass2").val();
	if(($password2 == "")&&($password1 == "")){
		$(".reg-box").eq(2).find("div").html('<span class="error-style">请输入确认密码</span>');
		$(".reg-pass2").css({"border-color":"#f97d7d","background":"url(../img/tc_no.png) no-repeat 333px center"});
		return;
	}else{
		if($password2==$password1){
			$(".reg-box").eq(2).find("div").html('');
			$(".reg-pass2").css({"border-color":"#37bd83","background":"url(../img/tc_yes.png) no-repeat 333px center"});
			return true;
		}else{
			$(".reg-box").eq(2).find("div").html('<span class="error-style">两次输入的密码不一致！</span>');
			$(".reg-pass2").css({"border-color":"#f97d7d","background":"url(../img/tc_no.png) no-repeat 333px center"})
			return;
		}
	}
}
$(function(){
	//注册，登录页面加载信息
	(function(){
			
			$(".con-header").load("../html/common.html #con-header");
			$(".about").load("../html/common.html #about");
			$(".links").load("../html/common.html .links");
			$(".bottom").load("../html/common.html .bottom");
			})();
	
//-----------------------------注册页面实现选项卡功能
	(function(){
		$(".rc-nav>li").click(function(){
			$(this).addClass("hover-style").siblings().removeClass("hover-style");
			$(".rc-contain>div").eq($(this).index()).addClass("click-style").siblings().removeClass("click-style");
		})
	})();
//注册页面效果显示	
		$(".rules").click(function(){
			if(!$('input[type="checkbox"]').is(":checked")){
				$(".read").find("div").html('<span class="error-style">您必须同意沱沱工社用户协议才能注册</span>');
			}else{
				$(".read").find("div").html('');
			}
		});
		
		
		$(".reg-phone").blur(function(){
			validatephone();
			
		});
		$(".reg-pass1").blur(function(){
			validatePass();
		});
		
		$(".reg-pass2").blur(function(){
			validatePass1();
		});
//提交时跳转页面，保存cookie	
		$("#check").click(function(){
			if(validatephone()&&validatePass()&&validatePass1()) {
				var arr=[];
				var phone=$(".reg-phone").val();
				var pass=$(".reg-pass1").val();
				arr.push({"phone":phone,"pass":pass});
				var str=JSON.stringify(arr);
				$.cookie('user',str);
         		window.location.href="../html/index.html"; 
			} else {
         				 return false;
     		   }
		});
		
//------------------------------------登录

	$(".login-user").blur(function(){
			loginUser();
			//alert("111");
			
	});
	$(".login-pass").blur(function(){
			loginPass();
			//alert("111");
	});
	$(".login-btn").click(function(){
		if(loginUser()&&loginPass()){
			var user=JSON.parse($.cookie('user'));
			//console.log(user);
			if(user==null){
				$(".login-user").next().html('<span class="error-style">该用户名没有被注册</span>');
				$(".login-user").css({"border-color":"#37bd83","background":"url(../img/tc_no.png) no-repeat 333px center"});
			}else{
				for(var i=0;i<user.length;i++){
					if(user[i].phone==$(".login-user").val().trim()){
						if(user[i].pass==$(".login-pass").val().trim()){
							if($(".login-auto").is(":checked")){
								var userObj=JSON.stringify(user);
								$.cookie('user',userObj,{expires:30});
								window.location.href="../html/index.html";
							}else{
								window.location.href="../html/index.html"; 
							}
						}else{
							$(".login-pass").next().html('<span class="error-style">您输入的密码错误</span>');
							$(".login-pass").css({"border-color":"#37bd83","background":"url(../img/tc_no.png) no-repeat 333px center"});
						}
					}else{
						$(".login-user").next().html('<span class="error-style">很抱歉。您输入的用户名不存在</span>');
						$(".login-user").css({"border-color":"#37bd83","background":"url(../img/tc_no.png) no-repeat 333px center"});
					}
				}
			}
			
		}else{
			return false;
		}
	})

})

function loginUser(){
		
	if($(".login-user").val().trim()==""){
		$(".login-user").next().html('<span class="error-style">用户名不能为空，请输入用户名</span>');
		$(".login-user").css({"border-color":"#f97d7d","background":"url(../img/tc_no.png) no-repeat 333px center"});
		return;
	}
	else{
			$(".login-user").next().html('');
			$(".login-user").css({"border-color":"#37bd83","background":"url(../img/tc_yes.png) no-repeat 333px center"});
			return true;
		
	}
}
function loginPass(){
	var $password=$(".login-pass").val();
	if($password.trim()== ""){
		$(".reg-box").eq(1).find("div").html('<span class="error-style">请输入密码</span>');
		$(".login-pass").css({"border-color":"#f97d7d","background":"url(../img/tc_no.png) no-repeat 333px center"});
		return;
	}else{
		$(".reg-box").eq(1).find("div").html('');
		$(".login-pass").css({"border-color":"#37bd83","background":"url(../img/tc_yes.png) no-repeat 333px center"});
		return true;
		
	}
}


























