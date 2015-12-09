/* @preserve
  _____   _    _   _  ___
 |__  /  / \  | \ | |/ _ \   
   / /  / _ \ |  \| | | | |  
  / /_ / ___ \| |\  | |_| | 
 /____/_/   \_\_| \_|\___/   
  C A P T U R E   L I F E
                                                                                                 
 */

function validateEmail(mail)   
  {  
   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))  
    {  
      return (true);
    }  
      return (false); 
} 

function passwordResetSubmit() {

  verified = true;

  if (!validateEmail($("#userEmail").val())) {

    verified = false;

    $("#validationEmailText").html(" - Please enter a valid email address.")
  }

  if (verified == true){

  var jsonBuild = {
    email: $("#userEmail").val()
  };

   $(".loginButton").addClass("disabled")

  jQuery.ajax({
     type: 'POST',
    
      url: apiRoot + 'api/auth/password/send-reset',
      data: jsonBuild,
      dataType: "json",
      timeout: 10000,
      success: function(result){
        $(".formElements").fadeOut();
        $(".loginMessage").html("<h2>Thanks</h2>If an account exists for that email address we will have sent an email. Please click on the button in the email to reset the password.")

         ga('send', 'event', 'Password Reset Link Sent', 'Clicked');
      },
      error: function (xhr, ajaxOptions, thrownError){
      
        $(".loginButton").removeClass("disabled")

        $(".formFail").html("There was an error with your submission.<br><br>")   

      }
  });
  }


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


function passwordResetSubmitConfirm() {

  $(".loginButton").addClass("disabled")

  var a = location.href;
  var b = a.replace(location.hash, "");
  var c = b.substring(a.indexOf("?")+1);

   if ($("#newPassConfirm").val() != $("#newPass").val()) {
      $(".invalidText").html(" - Passwords do not match")
    }else {

  var jsonBuild = {
    email: $("#userEmail").val(),
    reset_token: c,
    pass: md5($("#newPass").val())
  };

  jQuery.ajax({
     type: 'POST',
    
      url: apiRoot + 'api/auth/password/reset',
      data: jsonBuild,
      dataType: "json",
      timeout: 10000,
      success: function(result){
        $(".formElements").fadeOut();
        $(".loginMessage").html("<h2>Thanks</h2>Your password has now been reset. Please <a href='javascript:showLogin()'>Log in</a> to access your account.")
        ga('send', 'event', 'Password Reset with Auth Submit', 'Clicked');
      },
      error: function (xhr, ajaxOptions, thrownError){
       $(".formFail").html("There was an error with your submission.<br><br>")
       $(".loginButton").removeClass("disabled")

      }
  });
}

}
