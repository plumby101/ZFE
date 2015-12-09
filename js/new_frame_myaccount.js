  /* @preserve
    _____   _    _   _  ___
   |__  /  / \  | \ | |/ _ \   
     / /  / _ \ |  \| | | | |  
    / /_ / ___ \| |\  | |_| | 
   /____/_/   \_\_| \_|\___/   
    C A P T U R E   L I F E
                                                                                                   
   */

function registerNewFrame() {


    if (newFrameDeviceID == "") {
      $(".noIDError").html("Invalid or missing device ID.")
    }

    var submitErrors = true;

    if ($("#regSerial").val() == "" || $("#regSerial").val().length != 8) {
      $("#validationSerialNumber").html(" - Please enter a 8 numbers");
      submitErrors = false;
    }
    else 
      { $("#validationSerialNumber").html("");
    }

    if ($("#mac1").val() == "" || $("#mac1").val().length != 2) {
      $("#validationMacCode").html(" - Please enter a valid MAC code");
       submitErrors = false;
    }
    else 
     { $("#validationMacCode").html("");
    }

     if ($("#mac2").val() == "" || $("#mac2").val().length != 2) {
      $("#validationMacCode").html(" - Please enter a valid MAC code");
       submitErrors = false;
    }
    else 
      { $("#validationMacCode").html("");
    }

     if ($("#mac3").val() == "" || $("#mac3").val().length != 2) {
      $("#validationMacCode").html(" - Please enter a valid MAC code");
       submitErrors = false;
    }
    else 
      { $("#validationMacCode").html("");
    }

     if ($("#mac4").val() == "" || $("#mac4").val().length != 2) {
      $("#validationMacCode").html(" - Please enter a valid MAC code");
       submitErrors = false;
    }
    else 
     { $("#validationMacCode").html("");
    }

     if ($("#mac5").val() == "" || $("#mac5").val().length != 2) {
      $("#validationMacCode").html(" - Please enter a valid MAC code");
       submitErrors = false;
    }
    else 
      { $("#validationMacCode").html("");
    }

      if ($("#mac6").val() == "" || $("#mac6").val().length != 2) {
      $("#validationMacCode").html(" - Please enter a valid MAC code");
       submitErrors = false;
    }
    else 
      { $("#validationMacCode").html("");
    }




  if (submitErrors){

    $(".loginButton").addClass("disabled")

    var jsonBuild = {
      device_id: newFrameDeviceID,
      user_id: globalID,
      auth_token: globalAuth,
      device_mac: $("#mac1").val() + $("#mac2").val() + $("#mac3").val() + $("#mac4").val() + $("#mac5").val() + $("#mac6").val(),
      device_sn_start: $("#regSerial").val(),

    };


    $.post( apiRoot + "api/zanos/newframe", jsonBuild, function( data ) {
          loadStatic("myzano");

    }).fail(function(xhr, textStatus, errorThrown) {
      $(".loginButton").removeClass("disabled")
          error = JSON.parse(xhr.responseText).message
          $(".submitError").html("There was an error with your submission:<br><br> <span class='white'>" + error + "</span><br><br>")
           ga('send', 'event', 'Register via APP Fail', 'Clicked');
  });
  }
}

