$(function(){

//ヘッダー
//windowサイズが変化するごとにjQueryの動作を変更する判定
var timer = false;
var currentWidth = window.innerWidth;
$(window).resize(function() {
 if (currentWidth == window.innerWidth) {
        // ウインドウ横幅が変わっていないため処理をキャンセル。
        // safariでリロードされる現象を防ぐ
        return;
      }else if (timer !== false) {
        clearTimeout(timer);
      }
      timer = setTimeout(function() {
        location.reload();
      }, 200);
    });

	//現在の画面サイズ
  var winW = $(window).width();
  //判定基準にしたい画面サイズ
  var devW = 1023;
  
  if (winW <= devW) {
    //720px以下の時の処理  
    $(document).on('click',function(e) {
     if(!$(e.target).closest('.navigation').length) {
     // ターゲット要素の外側をクリックした時の操作
     $("nav").slideUp();
     $(".nav-cover").slideUp();
   } else {
     // ターゲット要素をクリックした時の操作
     $("nav:not(:animated)").slideToggle();
     $(".nav-cover:not(:animated)").slideToggle();
   }
 });
	//スマホ用navここまで
	
} else {
  //720pxより大きい時の処理
  
  	//navをheaderの中に入れる
  	$("nav").insertAfter("#in-navigation");

    //画面をクリックするとheaderが隠れる
    $(document).on('click',function() {
    	$("header:not(:animated)").slideToggle();
    });

		//上にスライドでheader出現
		//下にスライドでheader隠れる
		var startPos = 0,winScrollTop = 0;
    $(window).on('scroll',function(){
      winScrollTop = $(this).scrollTop();
      if (winScrollTop > startPos) {
        $('header:not(:animated)').slideUp();
      } else {
        $('header:not(:animated)').slideDown();
      }
      startPos = winScrollTop;
    });

    $("footer ul li a").on('click',function() {
      $("header:not(:animated)").slideDown();
    });

  }

  });