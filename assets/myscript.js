
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
    //1023px以下の時の処理  
    $(document).on('click',function(e) {
     if(!$(e.target).closest('.navigation').length) {
     // ターゲット要素の外側をクリックした時の操作
     $("nav").slideUp();
     $(".nav-cover").slideUp();
     $(".navigation").removeClass("bg-change");
   } else {
     // ターゲット要素をクリックした時の操作
     $("nav:not(:animated)").slideToggle();
     $(".nav-cover:not(:animated)").slideToggle();
     $(".navigation").toggleClass("bg-change");
   }
 });


    //スムーススクロール
$(document).ready(function(){
  //URLのハッシュ値を取得
  var urlHash = location.hash;
  //ハッシュ値があればページ内スクロール
  if(urlHash) {
    //スクロールを0に戻す
    $('body,html').stop().scrollTop(0);
    setTimeout(function () {
      //ロード時の処理を待ち、時間差でスクロール実行
      scrollToAnker(urlHash) ;
    }, 100);
  }
  //通常のクリック時
  $('a[href^="#"]').click(function() {
    //ページ内リンク先を取得
    var href= $(this).attr("href");
    //リンク先が#か空だったらhtmlに
    var hash = href == "#" || href == "" ? 'html' : href;
    //スクロール実行
    scrollToAnker(hash);
    //リンク無効化
    return false;
  });

  // 関数：スムーススクロール
  // 指定したアンカー(#ID)へアニメーションでスクロール
  function scrollToAnker(hash) {
    $("nav").slideUp();
    $(".nav-cover").slideUp();
    $(".navigation").removeClass("bg-change");
    var target = $(hash);
    var position = target.offset().top;
    $('body,html').stop().animate({scrollTop:position}, 500);
  }
});

	//スマホ用navここまで



} else {
  //1023pxより大きい時の処理
  
  	//navをheaderの中に入れる
  	$("nav").insertAfter("#in-navigation");


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



  //スムーススクロール
$(document).ready(function(){
  //URLのハッシュ値を取得
  var urlHash = location.hash;
  //ハッシュ値があればページ内スクロール
  if(urlHash) {
    //スクロールを0に戻す
    $('body,html').stop().scrollTop(0);
    setTimeout(function () {
      //ロード時の処理を待ち、時間差でスクロール実行
      scrollToAnker(urlHash) ;
    }, 100);
  }
  //通常のクリック時
  $('a[href^="#"]').click(function() {
    //ページ内リンク先を取得
    var href= $(this).attr("href");
    //リンク先が#か空だったらhtmlに
    var hash = href == "#" || href == "" ? 'html' : href;
    //スクロール実行
    scrollToAnker(hash);
    //リンク無効化
    return false;
  });

  // 関数：スムーススクロール
  // 指定したアンカー(#ID)へアニメーションでスクロール
  function scrollToAnker(hash) {
    var target = $(hash);
    var position = target.offset().top;
    $('body,html').stop().animate({scrollTop:position}, 500);
  }
});


}

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