/* @preserve
  _____   _    _   _  ___
 |__  /  / \  | \ | |/ _ \   
   / /  / _ \ |  \| | | | |  
  / /_ / ___ \| |\  | |_| | 
 /____/_/   \_\_| \_|\___/   
  C A P T U R E   L I F E
                                                                                                 
 */

$(".utilityNav").html("");
$(".tempmobNav").css("display","none");

function validateEmail(mail)   
  {  
   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))  
    {  
      return (true);
    }  
      return (false); 
} 

function loginSubmit() {

    verified = true;

  if (validateEmail($("#userEmail").val()) ){

      $("#validationEmailText").html("")

    } else {

      verified = false;
      $("#validationEmailText").html(" - Invalid email address")

    }

    if ($("#passwordField").val() != "" ) {

      $("#validationPhoneText").html("")

    } else {

      verified = false;
      $("#validationPhoneText").html(" - Please enter a password")

    }


if (verified) {
  var jsonBuild = {
    email: $("#userEmail").val(),
    pass: md5($("#passwordField").val())
  };

  $(".loginButton").addClass("disabled");

  jQuery.ajax({
     type: 'POST',
    
      url: apiRoot + 'api/auth/authenticate',
      data: jsonBuild,
      dataType: "json",
      timeout: 10000,
      success: function(result){

         if (window.location.hash == "#login") {parent.location.hash = "home";}
          
          globalID = result.data.user_id;
          globalAuth = result.data.auth_token;
          setCookie("zanoID", result.data.user_id);
          setCookie("zanoAuthToken", result.data.auth_token);

          gotoHashPage(); 

          $(".utilityNav").html("<a href='javascript:logOut()'>Log out</a>");

          ga('send', 'event', 'Login Success', 'Clicked');

      },
      error: function (xhr, ajaxOptions, thrownError){
        $(".loginMessage").html("<span class='invalidText'>There was an error logging in.</span><br><br><div class='loginNotice'>This area is for My ZANO accounts only. Accounts are created when you first activate your ZANO via the App. Please <a href='https://store-brj95j3p.mybigcommerce.com/login.php'>click here if you wish to log in to your ZANO shop account</a>. </div><br>If you have forgotten your password, you can use our <a href='javascript: passwordReset()''>password reset</a> too.");
        
        $(".loginButton").removeClass("disabled")

        delete(globalID);
        delete(globalAuth);
        setCookie("zanoID", null);
        setCookie("zanoAuthToken", null);

         ga('send', 'event', 'Login Fail', 'Clicked');

      }
  });

  }


}

$('.login').keydown(function(e) {
  var key = e.which;
  if (key == 13) {
    loginSubmit();
  }
});

function passwordReset() {
  loadStatic("passwordreset");
}