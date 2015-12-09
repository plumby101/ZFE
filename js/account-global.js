apiRoot = "http://account.flyzano.com/";
apiMediaRoot = "http://account.flyzano.com/";

//apiRoot = "http://192.168.1.49:8888/";

function setCookie(key, value) {
            var expires = new Date();
            expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
            document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
        }

function getCookie(key) {
  var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
  return keyValue ? keyValue[2] : null;
}

function delete_cookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function verifyUser() {

  if ( getCookie('zanoAuthToken') !== null &&  typeof globalAuth === "undefined" ) {

      globalAuth = getCookie('zanoAuthToken');
      globalID = getCookie("zanoID");
      $(".utilityNav").html("<a href='javascript:logOut()'>Log out</a>");
    
  } 

  if (getCookie('zanoAuthToken') === null &&  typeof globalAuth === "undefined") {
     //$(".utilityNav").html("<a href='javascript: loadRegister()'> Register</a> | <a href='javascript: showLogin()''>Log in</a>");
     //loadStatic("login");
  } 

   if (getCookie('zanoAuthToken') === "undefined" ||  typeof globalAuth === "undefined") {
     //$(".utilityNav").html("<a href='javascript: loadRegister()'> Register</a> | <a href='javascript: showLogin()''>Log in</a>");
  } 

}

function gotoHashPage(){

  if (window.location.hash == "#login") {loadStatic("login");}
  if (window.location.hash == "#register") {loadStatic("register");}
  if (window.location.hash == "#registeruptodate") {loadStatic("registeruptodate");}
  if (window.location.hash == "#videos") {loadMedia("videos");}
  if (window.location.hash == "#photos") {loadMedia("photos");}
  if (window.location.hash == "#all") {loadMedia("all");}
  if (window.location.hash == "#home") {loadStatic("home");}
  if (window.location.hash == "#downloads") {loadStatic("downloads");}
  if (window.location.hash == "#serial") {loadStatic("serial");}
  if (window.location.hash == "#connections") {loadStatic("connections");}
  if (window.location.hash == "#myzano") {loadStatic("myzano");}
  if (window.location.hash == "#developer") {loadStatic("developer");}
  if (window.location.hash == "#passwordreset") {loadStatic("passwordreset");}
  if (window.location.hash == "#passwordresetconfirm") {loadStatic("passwordresetconfirm");}
  if (window.location.hash == "#diagnose") {loadStatic("diagnose");}
  if (window.location.hash == "#accounttype") {loadStatic("accounttype");}
  if (window.location.hash == "#developer") {loadStatic("home");}
  if (window.location.hash == "#newzano") {loadStatic("newzano");}
  if (window.location.hash == "") {loadStatic("home");}
  
}



function firstLoadVerify() {

 if ( getCookie('zanoAuthToken') !== null &&  typeof globalAuth === "undefined" ) {

      globalAuth = getCookie('zanoAuthToken');
      globalID = getCookie("zanoID");
      $(".utilityNav").html("<a href='javascript:logOut()'>Log out</a>");
      gotoHashPage(); 
    
  } else 

  if (getCookie('zanoAuthToken') === null ||  typeof globalAuth === "undefined") {

      if (window.location.hash == "#passwordresetconfirm") {gotoHashPage()}
        else{
          loadStatic("login");
        }
       
  } else

   if (getCookie('zanoAuthToken') === "undefined" ||  typeof globalAuth === "undefined") {
     //$(".utilityNav").html("<a href='javascript: loadRegister()'> Register</a> | <a href='javascript: showLogin()''>Log in</a>");

       if (window.location.hash == "#passwordresetconfirm") {gotoHashPage()}
        else{
          loadStatic("login");
        }

  } 


    
}

$("a").hover(function() {
    $(this).css('cursor','pointer');
}, function() {
    $(this).css('cursor','auto');
});

function logOut() {

    var userPostArray = {
        user_id :  globalID,
        auth_token : globalAuth
    };


    $.post( apiRoot + "api/auth/logout", userPostArray, function( data ) { 
              //$(".utilityNav").html("<a href='javascript: loadRegister()'> Register</a> | <a href='javascript: showLogin()''>Log in</a>");

              globalID = "";
              globalAuth = "";
              setCookie("zanoID", "");
              setCookie("zanoAuthToken", "");
              showLogin() ;
           }).fail(function() {
            // $(".utilityNav").html("<a href='javascript: loadRegister()'> Register</a> | <a href='javascript: showLogin()''>Log in</a>");
              globalID = "";
              globalAuth = "";
              setCookie("zanoID", "");
              setCookie("zanoAuthToken", "");
              showLogin() ;
          });

}

function showLogin() {
    parent.location.hash = "login";
    $( ".mainContent" ).load("login.html");
    $(".liveNav").css("display","none");
    $(".tempmobNav").css("display","none");

     //$(".utilityNav").html("<a href='javascript: loadRegister()'> Register</a> | <a href='javascript: showLogin()''>Log in</a>");

}

function loadRegister() {
    parent.location.hash = "register";
    $( ".mainContent" ).load("register.html");
    $(".liveNav").css("display","none");
    $(".tempmobNav").css("display","none");

}

function loadDeveloper() {
   parent.location.hash = "developer";
        $( ".mainContent" ).load("developer.html");
       $(".liveNav").css("display","block");
        $(".tempmobNav").css("display","block");

}

function loadStatic(page){

      $(".mainContent").html("<div class='preloaderHolder'><img src='//account.flyzano.com/images/preloader.gif' /><br>LOADING</div>")

      closeMobileMenu();

  //closeMobileMenu()

    if (page == 'home') {
        parent.location.hash = "home";
        $( ".mainContent" ).load("myaccount.html");
    }

    if (page == 'passwordreset') {
        parent.location.hash = "passwordreset";
        $( ".mainContent" ).load("passwordreset.html");
       $(".liveNav").css("display","none");
       $(".tempmobNav").css("display","none");
    }

    if (page == 'passwordresetconfirm') {
        parent.location.hash = "passwordresetconfirm";
        $( ".mainContent" ).load("passwordconfirm.html");
       $(".liveNav").css("display","none");
       $(".tempmobNav").css("display","none");
    }

    if (page == 'developer') {
        parent.location.hash = "developer";
        $( ".mainContent" ).load("developer.html");
       $(".liveNav").css("display","block");
        $(".tempmobNav").css("display","block");
    }

      if (page == 'diagnose') {
        parent.location.hash = "diagnose";
        $( ".mainContent" ).load("diagnose.html");
       $(".liveNav").css("display","none");
       $(".tempmobNav").css("display","none");
    }

    if (page == 'downloads') {
        parent.location.hash = "downloads";
        $( ".mainContent" ).load("downloads.php");
        $(".liveNav").css("display","block");
        $(".tempmobNav").css("display","block");
    }

     if (page == 'newzano') {
        parent.location.hash = "newzano";
        $( ".mainContent" ).load("new_zano.html");
        $(".liveNav").css("display","block");
        $(".tempmobNav").css("display","block");
    }

    if (page == 'connections') {
        parent.location.hash = "connections";
        $( ".mainContent" ).load("socialconnections.html");
         $(".liveNav").css("display","block");
         $(".tempmobNav").css("display","block");
    }

    if (page == 'myzano') {
        parent.location.hash = "myzano";
        $( ".mainContent" ).load("myzano.html");
         $(".liveNav").css("display","block");
         $(".tempmobNav").css("display","block");
    }
    if (page == 'register') {
        $( ".mainContent" ).load("register.html");
        $(".liveNav").css("display","none");
        $(".tempmobNav").css("display","none");
    }

    if (page == 'registeruptodate') {
        $( ".mainContent" ).load("registeruptodate.html");
        $(".liveNav").css("display","none");
        $(".tempmobNav").css("display","none");
    }

    if (page == 'register_serial') {
        $( ".mainContent" ).load("register_serial.html");
        $(".liveNav").css("display","none");
        $(".tempmobNav").css("display","none");
    }
    if (page == 'serial') {
        $( ".mainContent" ).load("mac_serial.html");
        $(".liveNav").css("display","none");
        $(".tempmobNav").css("display","none");
    }
    if (page == 'login') {
        parent.location.hash = "login";
        $( ".mainContent" ).load("login.html");
        $(".liveNav").css("display","none");
        $(".tempmobNav").css("display","none");
    }
}

function loadMedia(mediaType) {
    closeMobileMenu();
  	parent.location.hash = mediaType;
  	$( ".mainContent" ).load("allmedia.html");
    $(".liveNav").css("display","block");
    $(".tempmobNav").css("display","block");
}

// Mobile

$(".MobileMenu").html($(".mainnav").html());
$(".MobileMenu").append($(".accountsubnav").html());

function showmenu() {
  $( ".MobileMenu" ).animate({left: 0
}, 100, function() {
    // Animation complete.
});
}


  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-64608963-1', 'auto');
  ga('send', 'pageview');




