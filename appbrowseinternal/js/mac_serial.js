  /* @preserve
    _____   _    _   _  ___
   |__  /  / \  | \ | |/ _ \   
     / /  / _ \ |  \| | | | |  
    / /_ / ___ \| |\  | |_| | 
   /____/_/   \_\_| \_|\___/   
    C A P T U R E   L I F E
                                                                                                   
   */

function registerSerialSubmit() {

  

    var submitErrors = true;
    var macCodeValid = true;

    if ($("#regSerial").val() == "" || $("#regSerial").val().length != 8) {
      $("#validationSerialNumber").html(" - Please enter a 8 digits");
      submitErrors = false;
    } else
    {
      $("#validationSerialNumber").html("");
    }
    

    if ($("#mac1").val() == "" || $("#mac1").val().length != 2) {
      $("#validationMacCode").html(" - Please enter a valid MAC code");
       submitErrors = false;
       macCodeValid = false;
    }
    

     if ($("#mac2").val() == "" || $("#mac2").val().length != 2) {
      $("#validationMacCode").html(" - Please enter a valid MAC code");
       submitErrors = false;
       macCodeValid = false;
    }
   

     if ($("#mac3").val() == "" || $("#mac3").val().length != 2) {
      $("#validationMacCode").html(" - Please enter a valid MAC code");
       submitErrors = false;
       macCodeValid = false;
    }
   

     if ($("#mac4").val() == "" || $("#mac4").val().length != 2) {
      $("#validationMacCode").html(" - Please enter a valid MAC code");
       submitErrors = false;
       macCodeValid = false;
    }
    

     if ($("#mac5").val() == "" || $("#mac5").val().length != 2) {
      $("#validationMacCode").html(" - Please enter a valid MAC code");
       submitErrors = false;
       macCodeValid = false;
    }
   

      if ($("#mac6").val() == "" || $("#mac6").val().length != 2) {
      $("#validationMacCode").html(" - Please enter a valid MAC code");
       submitErrors = false;
       macCodeValid = false;
    }
    
    if (macCodeValid){ 
      $("#validationMacCode").html("");
    }




  if (submitErrors){

    $(".loginButton").addClass("disabled")

    var jsonBuild = {
      user_id: globalID,
      auth_token: globalAuth,
      device_mac: $("#mac1").val() + $("#mac2").val() + $("#mac3").val() + $("#mac4").val() + $("#mac5").val() + $("#mac6").val(),
      device_sn_start: $("#regSerial").val(),

    };


    $.post( apiRoot + "api/zanos/snmacreg", jsonBuild, function( data ) {
            globalID = data.data.user_id;
            globalAuth = data.data.auth_token;
            setCookie("zanoID", data.data.user_id);
            setCookie("zanoAuthToken", data.data.auth_token);
            $(".register").html("<h1>Registration - Complete</h1>Thank you for registering your ZANO. <br><br>Please close this window and log into the APP.")
            ga('send', 'event', 'Register via APP Success', 'Clicked');

    }).fail(function(xhr, textStatus, errorThrown) {
      $(".loginButton").removeClass("disabled")
          error = JSON.parse(xhr.responseText).message
          $(".submitError").html("There was an error with your submission:<br><br> <span class='white'>" + error + "</span><br>")
           ga('send', 'event', 'Register via APP Fail', 'Clicked');
  });
  }
}

