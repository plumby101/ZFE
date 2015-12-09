  /* @preserve
    _____   _    _   _  ___
   |__  /  / \  | \ | |/ _ \   
     / /  / _ \ |  \| | | | |  
    / /_ / ___ \| |\  | |_| | 
   /____/_/   \_\_| \_|\___/   
    C A P T U R E   L I F E
                                                                                                   
   */

// Regex to valudate email

function validateEmail(mail)   
  {  
   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))  
    {  
      return (true);
    }  
      return (false); 
} 

// Regex to valudate phone

function validatePhone(txtPhone) {
      var a = txtPhone;
      var filter = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
      if (filter.test(a)) {
          return true;
      }
      else {
          return false;
      }
}

// Submit registration infomraiton

function registerSubmit() {

    var submitErrors = true;

    if (!$("#manualsCheckbox").is(":checked")) {
        $("#validationreManualCheckbox").html(" - Please read the User Manual then check the box");
      submitErrors = false;
    }
    else {
      $("#validationreManualCheckbox").html("");
      submitErrors = true;
    }

    if (!$("#flightschoolCheckbox").is(":checked")) {
      $("#validationreFlightCheckbox").html(" - Please view the Flight School videos then check the box");
      submitErrors = false;
    }
    else {
       $("#validationreFlightCheckbox").html("");
      submitErrors = true;
    }

    $("#flightschoolCheckbox").is(":checked");

    if ($("#firstName").val() == "") {
      $("#validationTextFN").html(" - Please enter a first name");
      submitErrors = false;
    }
    else 
      { $("#validationTextFN").html("");
    }

    if ($("#lastName").val() == "") {
      $("#validationTextLN").html(" - Please enter a last name");
       submitErrors = false;
    }
    else 
      { $("#validationTextLN").html("");
    }

    if (!validateEmail($("#userEmail").val())) {
      $("#validationTextEM").html(" - Please enter a valid email address");
       submitErrors = false;
    }
    else 
      { $("#validationTextEM").html("");
    }

    if ($("#regCountry").val() == 'null') {
      $("#validationTextCountry").html(" - Please select a country");
       submitErrors = false;
    }
    else 
      { $("#validationTextCountry").html("");
    }

    if (!validatePhone($("#phoneNumber").val())) {
      $("#validationTextPhone").html(" - Please enter a valid phone number");
       submitErrors = false;
    }
     else 
      { $("#validationTextPhone").html("");
    }

    if ($("#passwordField").val() == "") {
      $("#validationPassword").html(" - Please enter a password");
      submitErrors = false;
    }
    else {
      $("#validationPassword").html("");
    }


    if ($("#repasswordField").val() == ""){
      $("#validationreRePassword").html(" - Please repeat the password");

      submitErrors = false;
    }
    else {
      if ($("#repasswordField").val() != $("#passwordField").val()) {
      $("#validationPassword").html(" - The passwords do not match");
      $("#validationreRePassword").html(" - The passwords do not match");
       submitErrors = false;
    }
    else {
      $("#validationPassword").html("");
      $("#validationreRePassword").html("");
    }
  }

  if (submitErrors){
    var jsonBuild = {
      email: $("#userEmail").val(),
      pass: md5($("#passwordField").val()),
      forename: $("#firstName").val(),
      surname: $("#lastName").val(),
      phone: $("#phoneNumber").val(),
      countrycode: $("#regCountry").val()
    };


    $.post( apiRoot + "api/auth/register", jsonBuild, function( data ) {
            globalID = data.data.user_id;
            globalAuth = data.data.auth_token;
            setCookie("zanoID", data.data.user_id);
            setCookie("zanoAuthToken", data.data.auth_token);
            ga('send', 'event', 'Register via APP Success', 'Clicked');
            loadStatic('serial');

    }).fail(function(xhr, textStatus, errorThrown) {
          error = JSON.parse(xhr.responseText).message;
          delete(globalID);
          delete(globalAuth);
          setCookie("zanoID", null);
          setCookie("zanoAuthToken", null);
          $(".loginMessage").html("There was an error with your submission:<br><br> <span class='white'>" + error + "</span>")
           ga('send', 'event', 'Register via APP Fail', 'Clicked');
  });
  }
}

$('.register').keydown(function(e) {
  var key = e.which;
  if (key == 13) {
   registerSubmit();
  }
});
