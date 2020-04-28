// ヘッダーの設定
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
  //1023pxより大きい時の処理
  
  	//navをheaderの中に入れる
  	$("nav").insertAfter("#in-navigation");

    //画面をクリックするとheaderが隠れる
    // $(document).on('click',function() {
    // 	$("header:not(:animated)").slideToggle();
    // });

		//上にスライドでheader出現
		//下にスライドでheader隠れる
		// var startPos = 0,winScrollTop = 0;
  //   $(window).on('scroll',function(){
  //     winScrollTop = $(this).scrollTop();
  //     if (winScrollTop > startPos) {
  //       $('header:not(:animated)').slideUp();
  //     } else {
  //       $('header:not(:animated)').slideDown();
  //     }
  //     startPos = winScrollTop;
  //   });

  //   $("footer ul li a").on('click',function() {
  //     $("header:not(:animated)").slideDown();
  //   });


  // タイトル画面が表示されている時はメニューバーを隠す
  // 変化させる要素
  var elem = $("#sec0");
  // ページトップからの要素の高さ
  var elemO = elem.offset().top;
  // 変化させる要素の高さ
  var elemH = elem.height();
  // ウィンドウの高さ
  var windowH = $(window).height();

  $(window).on("scroll", function() {

    // スクロールした値
    var windowS = $(window).scrollTop();

    // 要素が半分見えたら表示して、要素がウィンドウから半分消えたら非表示にする
    if(windowS > elemO + windowH -100){
      $("header:not(:animated)").slideDown();
    } else {
      $("header:not(:animated)").slideUp();
    }
  });

}

});


// priceの色
$('.menu-card').hover(
  function() {

        //マウスカーソルが重なった時の処理
        $(this).find('.price').css('color','#bd7b00');
      },
      function() {

        //マウスカーソルが離れた時の処理
        $(this).find('.price').css('color','#ff3b00');

      }
      );


// 背景画像の入れ替え
$(function () {
  $('#change1').on('inview', function() {
// 要素が画面に表示された時に実行する処理を記述
  $('.title-picture').css('display','block');
  });

  $('#change2').on('inview', function() {
// 要素が画面に表示された時に実行する処理を記述
  $('.title-picture').css('display','none');
  });
});



// instagram
$(function () {
  try {
        // インスタのIDを入れようね
        this.name = "thelocalburger2019";
        $.ajax('https://www.instagram.com/' + this.name + '/', {
          timeout: 2000,
          datatype: 'html'
        }).then(function (data) {
          json_string = data.split("window._sharedData = ")[1];
          json_string = json_string.split("};</script>")[0] + "}";
          this.Arrya_data = JSON.parse(json_string);
          let datas = this.Arrya_data.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges;

          // ステップ1.for文でインスタの情報を9つ取得してくる
          for (i in datas) {
                // 画像URL取得
                var url = datas[i].node.display_url;

                // テキスト取得
                var text = datas[i].node.edge_media_to_caption.edges[0].node.text;

                this.html = `
                <div class="carousel-item sinchaku-item">
                <img class="d-block w-100 sec-picture3" src="${url}" alt="First slide">
                <div class="mt-5 sinchaku-text scroll d-md-block w-100">
                <p class="clr-white">${text}</p>
                </div>
                </div>
                `;
                
                $(".insta-card").append(this.html);
              }
            });

        // ステップ2.上記for文のインスタの情報が上手く読み込まれた場合、「kasika」クラスのついたdiv要素をhtml上に出現させる
        // ステップ3.は一番下に記述してる！ 
        $("#sec6").after('<div class="empty-space-0rem kasika"></div>');

      } catch (error) {
        alert(error);
      }
    });


window.onload = function() {
    //menu-cardクラスが付与されている要素をクリックすると
    //詳細画面が開き、画像やテキストが代入されます
    $(".menu-card").on("click", function(){ 
      $(".item-img").attr("src", $(this).find(".menu-card-picture").attr("src"));
      $(".item-title").text($(this).find(".menu-name").text());
      $(".item-mini").text($(this).find(".menu-mini").text());
      $(".item-price").text($(this).find(".price").text());
      $(".item-text").text($(this).find(".menu-explanation").text());
      $(".shosai").css("display","block");
      $(".shosai-out").css("display","block");
    });
    
        //詳細画面外をクリックしたときに詳細画面を閉じます
        $(".shosai-out").on("click",function() {
          $(".shosai").css("display","none");
          $(".shosai-out").css("display","none");
        });

        // ステップ3.「kasika」クラスのついた要素が画面上に入った場合、カルーセル発動に必要な「active」クラスを付与する
        $('.kasika').one('inview', function() {
          $(".sinchaku-item:first-of-type").addClass("active");
        });

        $('#card-reload').one('click',function()){
          $(".sinchaku-item:first-of-type").addClass("active");
        }
      };