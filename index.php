<!DOCTYPE html>
<html lang="en-US">
<head>
    <title>ZANO - CAPTURE LIFE</title>
    <meta charset="ISO-8859-1">
    <meta name="description" content="ZANO - Autonomous. Intelligent. Swarming. Nano Drone." />
    <meta name="keywords" content="ZANO, autonomous drone, intelligent drone , ZANO Swarming, nano drone, drones, social media drone, selfie drone, quadraceptor, nano quadraceptor" />
    <meta name="theme-color" content="#000000">
    <meta property="og:url" content="http://flyzano.com/about" />
    <meta property="og:image" content="http://flyzano.com/images/fbimage.jpg" />
    <meta property="og:title" content="ZANO - Autonomous. Intelligent. Swarming. Nano Drone." />
    <meta property="og:description" content="Meet ZANO the world's most sophisticated nano drone - aerial photo and HD video capture platform." />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0"> 
    <link href="http://flyzano.com/css/custombootstrap.css" rel="stylesheet">
    <link href="http://flyzano.com/css/custom.css" rel="stylesheet">
    <link href="css/account_global.css" rel="stylesheet">
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
      <![endif]-->
  </head>
  <body>
    <?php include "../../zano-root/public_html/includes/topnav.php";?>
    <div class="container accountContent">
        <div class="col-sm-2 myaccount-sub hidden-xs">
          <div class="row accountsubnav">
            <ul class="category liveNav">
                <li><a href="javascript:void(0);" onclick="loadStatic('home')">Account Home</a></li>
                <li><a href="javascript:void(0);" onclick="loadStatic('connections')">Connections</a></li>
                <li><a href="javascript:void(0);" onclick="loadMedia('photos')">My Photos</a></li>
                <li><a href="javascript:void(0);" onclick="loadMedia('videos')">My Videos</a></li>
                <li><a href="javascript:void(0);" onclick="loadMedia('all')">All Media</a></li>
                <li><a href="javascript:void(0);" onclick="loadStatic('myzano')">My ZANOs</a></li>
                <!--<li><a href="javascript:void(0);" onclick="loadStatic('downloads')">Downloads</a></li>-->
                <li><a href="javascript:void(0);" onclick="javascript:logOut()" class="loginNav">Log Out</a></li>
            </ul>
        </div>
    </div>
    <div class="mobileMenuFader"></div>
    <div class="mainContent"></div>
</div>
<script src="http://flyzano.com/js/jquery-1.11.2.min.js"></script>
<script src="js/account-global.min.js"></script>
<script src="http://flyzano.com/js/global.min.js"></script>
<script>
    appBrowser = false;
    firstLoadVerify(); 
</script>
<?php include "../../zano-root/public_html/includes/footer.php";?>
</body>
