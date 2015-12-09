<!DOCTYPE html>
<html lang="en-US">
<head>
    <title>ZANO - CAPTURING LIFE</title>
    <meta name="description" content="ZANO - View, share and edit your ZANO content">
    <meta name="keywords" content="ZANO, my account, account, flyzano account, zano media, zano my media, zano videos, zano photos, zano content, zano jpgs">
    <meta name="author" content="Team ZANO">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,700' rel='stylesheet' type='text/css'>
    <link href="//flyzano.com/css/custombootstrap.css" rel="stylesheet">
    <link href="//flyzano.com/css/custom.css" rel="stylesheet">
    <link href="//account.flyzano.com/css/account_global.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>
<div class="appBrowseHeader">
<div class="appBrowseLogo"></div>

</div>
       <div class="appBrowseNav">
        <a href="javascript:appMedia('all')" class="mediaBrowse"><button type='submit' class='btn btn-zano appBrowseButton inverted' >My Media</button></a><a href="javascript:appConnections()" class="appConnections"><button type='submit' class='btn btn-zano appBrowseButton' >Connections</button></a><a href="http://account.flyzano.com"><button type='submit' class='btn btn-zano appBrowseButton' >Full Site</button></a>

    </div>
    <div class="mainContent appBrowse">
        Please click on an item in the navigation. 
    </div>

    
    <script src="//flyzano.com/js/jquery-1.11.2.min.js"></script>
    <script src="//account.flyzano.com/js/account-global.min.js"></script>
    <script src="//flyzano.com/js/global.min.js"></script>
    <script src="//account.flyzano.com/js/allmedia.min.js"></script>
    <script>

        function appMedia(mediaType){
            $(".mediaBrowse button").addClass("inverted");
            $(".appConnections button").removeClass("inverted");
            loadMedia(mediaType);
        }

        function appConnections (){
            $(".mediaBrowse button").removeClass("inverted");
            $(".appConnections button").addClass("inverted");
            loadStatic('connections')
        }

        function getUrlValue(varName) {
            var urlString = document.location.href.replace(location.hash , "" )
            var split = urlString.split('?');
            var value = '';
            if (split.length == 2) {
                split = split[1].split('&');
                for (var i = 0; i < split.length; i+=1) {
                var keyValue = split[i].split('=');
                if (keyValue.length == 2 && keyValue[0] == varName) {
                    value = keyValue[1];
                    break;
                }   
            }
        }
        return value;

        }

        setCookie("zanoID", getUrlValue('id'));
        setCookie("zanoAuthToken", getUrlValue('auth'));
        globalID = getUrlValue('id'); 
        globalAuth = getUrlValue('auth'); 

        page = getUrlValue('page');

        if (globalID == "register" || page == "register") {
            loadStatic("register")
            $(".appBrowseNav").html("")
        }
        else if (globalID == "register_serial" || page == "register_serial" ){
            loadStatic("register_serial")
            $(".appBrowseNav").html("")
        }
        else if (globalID == "serial" || page == "serial") {
            loadStatic("serial")
            $(".appBrowseNav").html("")
        }
         else {

        appBrowser = true;

        var mediatype = window.location.hash.replace("#", "");
        if (mediatype == "all") {$(".pageTitleBrowserLogin").html("All Media")}
        if (mediatype == "videos") {$(".pageTitleBrowserLogin").html("My Videos")}
        if (mediatype == "photos") {$(".pageTitleBrowserLogin").html("My Photos")}
        socialNos = [];
        loadMedia('all')

        }

       

       
    </script>
    
</body>