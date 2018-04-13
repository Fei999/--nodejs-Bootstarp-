var num = 0;
		var w = 1205;

		$(function() {

			//	右键
			$("#btnR").click(function() {
					if(!$('#lunboCon').is(':animated')) {
						num++;
						$("#lunboCon").stop(true).animate({
							'left': num * -w + 'px',
						}, 500, 'swing', function() {

							if(num == $("#lunboCon").children("div").length - 7) {
								$("#lunboCon").css('left', '0px')
									//						console.log(num)
								num = 0;
							}
						})
					}

				})
				//	左键
			$("#btnL").click(function() {
				if(!$('#lunboCon').is(':animated')) {
					if(num == 0) {
						$('#lunboCon').css({
							'left': -w * ($('#lunboCon').children().length - 7) + 'px'
						})
						num = $('#lunboCon').children().length - 7;
					}
					num--;
					$('#lunboCon').animate({
						'left': -w * num + 'px'
					}, 500);
				}
			})
		})
		

//==============================================================

$(function(){
			$("#qwer>.box").eq(0).show()
			$(".qwer-li li").eq(0).addClass("box1")
			$(".qwer-li li").click(function(){
				 var a=$(this).index()
				$(".qwer-li li").removeClass().eq(a).addClass('box1')
				$("#qwer>.box").hide().eq(a).slideToggle()
			})
			
		})



