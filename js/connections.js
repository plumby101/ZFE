/* @preserve
  _____   _    _   _  ___
 |__  /  / \  | \ | |/ _ \   
   / /  / _ \ |  \| | | | |  
  / /_ / ___ \| |\  | |_| | 
 /____/_/   \_\_| \_|\___/   
  C A P T U R E   L I F E
                                                                                                 
  */

function convertTimeStamp(UNIX_timestamp) {

    var a = new Date(UNIX_timestamp*1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
  var time = date + ', ' + month + ' ' + year; //+ ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

// FB Success callback

function oauthCB(isSuccess, data) {
  if(isSuccess) {
    authpop.close();
    loadSocials();
  }
}

// Show permissions

function  showPermissions(theNetwork) {

 $(".socialPermissions").append("<span class='white'>*</span> To enable publishing to Facebook, please click “Reconnect” and accept the request for ZANO to post on your behalf. This permission is used only for posting media to Facebook, and will not post content without your explicit consent.");

}

// Social Reconnect

function socialReConnect(socialNetwork) {

  verifyUser() ;

  var userPostArray = {
    user_id :  globalID,
    auth_token : globalAuth
  };

  if (socialNetwork === "Facebook")
  {
   authpop = window.open("/api/oauth/fbv4?user_id="+globalID+"&auth_token="+globalAuth +"&fb_auth_type=rerequest","fbv4","width=580, height=400");
 }

 if (socialNetwork === "Twitter")
 {
  authpop = window.open("/api/oauth/twitter?user_id="+globalID+"&auth_token="+globalAuth);
}

if (socialNetwork === "YouTube")
{
  authpop = window.open("/api/oauth/youtube?user_id="+globalID+"&auth_token="+globalAuth);
}

if (socialNetwork === "Vimeo")
{
  //console.log("Connect to Vimeo");
}
}

// Social Connect

function socialConnect(socialNetwork) {

  verifyUser();

  var userPostArray = {
    user_id :  globalID,
    auth_token : globalAuth
  };

  if (socialNetwork === "Facebook")
  {
  authpop = window.open("/api/oauth/fbv4?user_id="+globalID+"&auth_token="+globalAuth,"fbv4","width=580, height=400");
 }

 if (socialNetwork === "Twitter")
 {
   authpop = window.open("/api/oauth/twitter?user_id="+globalID+"&auth_token="+globalAuth,"width=580, height=400");
 }

 if (socialNetwork === "YouTube")
 {
  authpop = window.open("/api/oauth/youtube?user_id="+globalID+"&auth_token="+globalAuth,"width=580, height=400");
}

if (socialNetwork === "Vimeo")
{
  //console.log("Connect to Vimeo");
}
}

// Social Disconnect

function socialDisconnect(socialNetwork) {

  var userPostArray = {
    user_id :  globalID,
    auth_token : globalAuth
  };

  verifyUser() ;

  if (socialNetwork === "Facebook")
    {
      $.post( apiRoot + "api/oauth/fbv4/disconnect", userPostArray, function( data ) { 
      loadSocials();
    }).fail(function() {
      $(".socialIntro").html(loginError);
    });
}

if (socialNetwork === "Twitter")
{
  $.post( apiRoot + "api/oauth/twitter/disconnect", userPostArray, function( data ) { 
      loadSocials();
    }).fail(function() {
      $(".socialIntro").html(loginError);
    });
}

if (socialNetwork === "YouTube")
{
   $.post( apiRoot + "api/oauth/youtube/disconnect", userPostArray, function( data ) { 
      loadSocials();
    }).fail(function() {
      $(".socialIntro").html(loginError);
    });
}

if (socialNetwork === "Vimeo")
{
  //console.log("Disconnect Vimeo");
}
}

// Load social media tools

function loadSocials(){

  verifyUser();

 $("#socialContent").html("Loading...");

 var userPostArray = {
  user_id :  globalID,
  auth_token : globalAuth
};

$.post( apiRoot + "api/user/networks", userPostArray, function( data ) {

  $("#socialContent").html("");

  $(".socialPermissions").html("");

  var  socialNos = data.data;

  connected = new Array();
  permissions = new Array();
  networks = new Array();

  $.each(socialNos, function(n, soc) {

    $("#socialContent").append("<div class='socialHolder socialholder-"+socialNos[n].name+"'><h2>"+socialNos[n].name+"</h2><div class='socialIcon "+ socialNos[n].name+ "'></div><div class='socialRight"+n+"'></div></div>");

    connected.push(socialNos[n].connected);
    permissions.push(socialNos[n].permissions);
    networks.push(n);

            //localStorage.setItem("Connected"+ n, socialNos[n].connected);
            //localStorage.setItem("Permissions"+ n, socialNos[n].permissions);
            //localStorage.setItem("networks", n);

            if (socialNos[n].connected && socialNos[n].permissions){ 
              socialStatus = "Connected : ";
              butttonState = "disconnect";
              buttonAction = "socialDisconnect("+"\""+socialNos[n].name +"\""+")";
              timstamp = convertTimeStamp(socialNos[n].connect_ts, '%H:%m:%s');
            } 

            if (socialNos[n].connected && !socialNos[n].permissions){
              socialStatus = "Invalid permissions <span class='white'>*</span>";
              butttonState = "reconnect";
              buttonAction = "socialReConnect("+"\""+socialNos[n].name +"\""+")";
              timstamp = "";
              showPermissions(socialNos[n].name);

            }

            if (!socialNos[n].connected){
              socialStatus = "You are not connected";
              butttonState = "connect";
              buttonAction = "socialConnect("+"\""+socialNos[n].name +"\""+")";
              timstamp = "";

            }

            $("#socialContent .socialRight" + n).append(socialStatus + " " + timstamp  + "<div class='socialButton'><button type='submit' class='btn btn-zano "+ butttonState+"' onClick="+ buttonAction+">"+butttonState +"</button></div>");
          });

}).fail(function() {
  if (!appBrowser) {
    $(".socialIntro").html(loginError);
  }
  else {
    $(".socialIntro").html("<div class='appBrowseError'>Your session has expired, please restart sharing from the APP.</div>");

  }
  $("#socialContent").html("");
});

}

loadSocials();