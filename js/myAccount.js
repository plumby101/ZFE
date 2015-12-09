/* @preserve
  _____   _    _   _  ___
 |__  /  / \  | \ | |/ _ \   
   / /  / _ \ |  \| | | | |  
  / /_ / ___ \| |\  | |_| | 
 /____/_/   \_\_| \_|\___/   
  C A P T U R E   L I F E
                                                                                                 
 */

function loadAccountInfo(loadThis){

    verifyUser();

    $("#accountContent").html("");
    $("#accountContent").html("<div class='preloaderHolder'><img src='images/preloader.gif' /><br>LOADING</div>");

    $("#accountContent").fadeTo( "fast" , 1);
    
    $("#toolFormHolder").hide();
    $(".formTools").fadeIn();
    $("#toolFormHolder").html('');
    

    var userPostArray = {
        user_id :  globalID,
        auth_token : globalAuth
    };

    $.post(apiRoot + "api/user/data", userPostArray, function( data ) {

        if (data.data === null || data.message === 'Not authed' ) {$("#accountContent").html(notLoggedIn()) ;}

            else {

        $(".liveNav").css("display","block");
        $(".tempmobNav").css("display","block");
        $(".circleHolder").fadeTo( "fast" , 1);
        $("#zanoStats").fadeTo( "fast" , 1);
        $("#accountTools").fadeTo( "fast" , 1);
        $("#lastLogged").fadeTo( "fast" , 1);
        $(".allCircles").fadeTo( "fast" , 1);
        $("#accountContent").html("<h2>Account Information</h2><div class='accountType'>Account Type: </div>");

        accountdata = data.data ;

        var a = [];

        $("#accountContent").append("Name: " + accountdata.user_profile.user_profile_forename + " " + accountdata.user_profile.user_profile_surname + "<br>");

        var accountTypes = accountdata.user_types; 

        if( $.type(accountTypes.user_types) == "object")
        {
             $(".accountType").append(accountdata.user_types[0].user_type_name );
             accountType = "normal";
        }
        else {
            $.each(accountTypes , function(n, ads) {

                if (n != 0){ $(".accountType").append(", ");}

                $(".accountType").append(accountdata.user_types[n].user_type_name);

                if (accountdata.user_types[n].user_type_name == "developer" && !$(".developerLink").length > 0) {

                    $("<li class='developerLink'><a href='javascript:loadDeveloper()'>Developer</a></li>").insertBefore(".loginNav")
                }

                if (accountdata.user_types[n].user_type_name == "beta") {

                    $("#lastLogged").append("<h2>Beta Tester</h2><div class='checkbox'><label><input type='checkbox' class='betaCheckbox'> I want to use Beta firmware on my ZANOs<span class='checkboxError'></span></label></div>")
                    setBetaTesterCheckbox()
                }
            });
            accountType = "multiple";
        }


        var emailAddresses = accountdata.user_email;
        if( $.type(accountdata.user_email) == "object")
        {
             $("#accountContent").append(accountdata.user_email.user_email_name + " Email Address: " + accountdata.user_email.user_email_address + "<br>");
        }
        else {
            $.each(emailAddresses, function(n, ads) {
                $("#accountContent").append(accountdata.user_email[n].user_email_name + " Email Address: " + accountdata.user_email[n].user_email_address  + "<br>");
            });
        }

        var phoneNos = accountdata.user_phone;
        if($.type(accountdata.user_phone) == "object"){

            $("#accountContent").append(accountdata.user_phone.user_phone_name + " Phone Number: " + accountdata.user_phone.user_phone_number + "<br>");

        }
            else {

         $.each(phoneNos, function(n, pho) {

             $("#accountContent").append(accountdata.user_phone[n].user_phone_name + " Phone Number: " + accountdata.user_phone[n].user_phone_number + "<br>");

        });

         }
         if (loadThis == "all") {

    }

        getZanoInfo ();
        $("#accountContent").append("<br><button type='submit' class='btn btn-zano' onClick='editAccountInfo()'>EDIT</button>");

        if (accountType == "normal") {
            $("#accountContent").append("<button type='submit' class='btn btn-zano' onClick='applyToBeDeveloper()'>APPLY TO BE A DEVELOPER</button>");
        }

   }

    }).fail(function() {
       notLoggedIn() 
    
  });

}

function setBetaTesterCheckbox(){

    var userPostArray = {
        user_id :  globalID,
        auth_token : globalAuth
    }

     // set initial state
    $.post(apiRoot + "api/user/firmware_type", userPostArray, function( data ) {

        if( data.data.firmware_type != 0){
            $(".betaCheckbox").prop('checked', true);
        }

    }).fail(function() {
        $(".checkboxError").html("Error reading beta state")
    });

   
    // set change detection function
    $('#lastLogged input[type="checkbox"]').change(function () {

        $.post(apiRoot + "api/user/toggle_beta_fw", userPostArray, function( data ) {
        
            if( data.data.firmware_type != 0){
                $(".betaCheckbox").prop('checked', true);
            }

        }).fail(function() {
            $(".checkboxError").html("Error setting beta state")
       });

    });

}

function notLoggedIn() {

    if (window.location.hash == "#login") {loadStatic("login");}
    else if (window.location.hash == "#register") {loadStatic("register");}
    else if (window.location.hash == "#passwordreset") {loadStatic("passwordreset");}
    else if (window.location.hash == "#passwordresetconfirm") {loadStatic("passwordresetconfirm");}
    else if (window.location.hash == "") {loadStatic("home");}
    else {showLogin()}

}

function getStats(zanoID) {

    verifyUser();

     var userPostArray = {
        user_id :  globalID,  
        auth_token : globalAuth
    }; 

    $.post( apiRoot + "api/user/metrics", userPostArray, function( data ) {

        var  metricData = data.data.metrics;

          // Total number of flights
        if (metricData.num_flights > 0) {
            $(".flights").html(metricData.num_flights);
        } else {
            $(".flights").html('<span class="comingSoon">Coming Soon</span>');
        }

        // Highest altitude
        if (metricData.max_height > 0) {
            $(".altitude").html(metricData.max_height / 1000);
        } else {
            $(".altitude").html('<span class="comingSoon">Coming Soon</span>');
        }

        // Total number of photos
        if (metricData.num_photos > 0) {
            $(".photos").html(metricData.num_photos);
        } else {
            $(".photos").html('<span class="comingSoon">Coming Soon</span>');
        }

        // Longest single flight time
        if (metricData.max_secs_flown > 0) {
            if (metricData.max_secs_flown  < 61) {
                $(".maxtime").html(metricData.max_secs_flown );
                $(".maxflightunit").html("<p>Longest Flight (seconds)</p>");
            }

            if (metricData.max_secs_flown < 3600 && metricData.max_secs_flown  > 60) {
                $(".maxtime").html(parseInt(metricData.max_secs_flown  / 60));
                $(".maxflightunit").html("<p>Longest Flight (minutes)</p>");
            }

            if (metricData.max_secs_flown  > 3600) {
                $(".maxtime").html(parseInt(metricData.max_secs_flown  / 3600));
                
                if (parseInt(metricData.max_secs_flown  / 3600) == 1) {
                    $(".maxflightunit").html("<p>Longest Flight (hours)</p>");
                } else {
                    $(".maxflightunit").html("<p>Longest Flight(hours)</p>");
                }
            }

        } else {
            $(".maxtime").html('<span class="comingSoon">Coming Soon</span>');
        }

        // Total Flight Time
        if (metricData.secs_flown > 0) {
            if (metricData.secs_flown < 61) {
                $(".flown").html(metricData.secs_flown);
                $(".flownunit").html("<p>Total Flight Time (seconds)</p>");
            }

            if (metricData.secs_flown < 3600 && metricData.secs_flown > 60) {
                $(".flown").html(parseInt(metricData.secs_flown / 60));
                $(".flownunit").html("<p>Total Flight Time (minutes)</p>");
            }

            if (metricData.secs_flown > 3600) {
                $(".flown").html(parseInt(metricData.secs_flown / 3600));
                
                if (parseInt(metricData.secs_flown / 3600) == 1) {
                    $(".flownunit").html("<p>Total Flight Time (hour)</p>");
                } else {
                    $(".flownunit").html("<p>Total Flight Time (hours)</p>");
                }
            }

        } else {
            $(".flown").html('<span class="comingSoon">Coming Soon</span>');
        }

        // Total length of video recorded
  
        if (metricData.secs_video > 0) {
            if (metricData.secs_video < 61) {
                $(".videos").html(metricData.secs_video);
                $(".videounit").html("<p>Seconds of Video</p>");
            }

            if (metricData.secs_video < 3600 && metricData.secs_video > 60) {
                $(".videos").html(parseInt(metricData.secs_video / 60));
                $(".videounit").html("<p>Minutes of Video</p>");
            }

            if (metricData.secs_video > 3600) {
                $(".videos").html(parseInt(metricData.secs_video / 3600));
                
                if (parseInt(metricData.secs_video / 3600) == 1) {
                    $(".videounit").html("<p>Hour of Video</p>");
                } else {
                    $(".videounit").html("<p>Hours of Video</p>");
                }
            }

        } else {
            $(".videos").html('<span class="comingSoon">Coming Soon</span>');
        }


    });

}

function getZanoInfo(){

    var userPostArray = {
        user_id :  globalID,  
        auth_token : globalAuth
    }; 

    $.post( apiRoot + "api/zanos/all", userPostArray, function( data ) {

         $("#zanoStats").html("<h2>ZANO</h2>");
        var  zanoData = data.data;

        if (zanoData.data === null || zanoData.length === 0) { $("#zanoStats").html("<h2>ZANO</h2>You currently have no ZANO's registered");}

        else {


        if ($.type(zanoData) != "array") {

            $("#zanoStats").append("<span class='white'>" + zanoData.device_name +  "</span><br>");
            //$("#zanoStats").append("Device type: " + zanoData.device_type +  "<br>");
            $("#zanoStats").append("WiFi ID: " + zanoData.device_ssid +  "<br>");
            $("#zanoStats").append("WiFi Password: " + zanoData.device_ssid_pass +  "<br>");
            $("#zanoStats").append("Serial Number: " + zanoData.device_sn  +  "<br>");
           // $("#zanoStats").append("Firmware: " +zanoData.device_fw_major + "-" + zanoData.device_fw_minor + "-" + zanoData.device_fw_revision +   "<br>");
            $("#zanoStats").append("Registered: " + zanoData.device_register_ts+  "<br>");

            getStats(zanoData.device_id);

       }
       else {

     // Start each
        $.each(zanoData, function(i, value){

            if ( i > 0) { $("#zanoStats").append("<br>")}

            $("#zanoStats").append("<span class='white'>" + zanoData[i].device_name +  "</span><br>");
            //$("#zanoStats").append("Device type: " + zanoData[i].device_type +  "<br>");
            $("#zanoStats").append("WiFi ID: " + zanoData[i].device_ssid +  "<br>");
            $("#zanoStats").append("WiFi Password: " + zanoData[i].device_ssid_pass  +  "<br>");
            $("#zanoStats").append("Serial Number: " + zanoData[i].device_sn  +  "<br>");
           // $("#zanoStats").append("Firmware: " +zanoData[i].device_fw_major + "-" + zanoData[i].device_fw_minor + "-" + zanoData[i].device_fw_revision +   "<br>");
            $("#zanoStats").append("Registered: " + zanoData[i].device_register_ts+  "<br>");

            getStats(zanoData[i].device_id);

         }); 
         // End each 
     }
     }

    }).fail(function() {
    $("#zanoStats").html(notLoggedIn());
  });
}

function applyToBeDeveloper(){

    parent.location.hash = "developer";
    $(".mainContent" ).load("accountTypeChange.html");
    $(".liveNav").css("display","block");
    $(".tempmobNav").css("display","block");

}

function editAccountInfo(){

    $(document).keypress(function(e) {
    if(e.which == 13) {
       submitDetailsForm()
    }
    });

    verifyUser();

    $(".circleHolder").fadeTo( "fast" , 0.2);
    $("#zanoStats").fadeTo( "fast" , 0.2);
    $("#accountTools").fadeTo( "fast" , 0.2);
     $("#lastLogged").fadeTo( "fast" , 0.2);

    $("#accountContent").html("<h2>Edit Account Information</h2>");

     var userPostArray = {
        user_id :  globalID,
        auth_token : globalAuth
    };

    $.post(apiRoot + "api/user/data", userPostArray, function( data ) {
    
        accountdata = data.data ;
     
        var emailAddresses = accountdata.user_email;

          if( $.type(accountdata.user_email) == "object")
        { var n = 0;
              $("#accountContent").append("<div class='form-group'><label for='emailField"+n+"'>"+ emailAddresses.user_email_name + " Email Address: <span id='currentEmailValidation"+n+"' class='allValidationText'></span></b></label> <input class='form-control emailField email0' type='text' name='email' id='email"+emailAddresses.user_email_id+"' value='"+emailAddresses.user_email_address+"'/></div>");
        }
        else {
            $.each(emailAddresses, function(n, ads) {
                 $("#accountContent").append("<div class='form-group'><label for='emailField"+n+"'>"+ emailAddresses[n].user_email_name + " Email Address: <span id='currentEmailValidation"+n+"' class='allValidationText'></span></b></label> <input class='form-control emailField email"+n+"' type='text' name='email' id='email"+emailAddresses[n].user_email_id+"' value='"+emailAddresses[n].user_email_address+"'/></div>");
            });
        }

        var phoneNos = accountdata.user_phone;

        if( $.type(accountdata.user_phone) == "object")

             { var n = 0;
              $("#accountContent").append("<div class='form-group"+n+"'><label for='phonefield"+n+"'>"+ accountdata.user_phone.user_phone_name + " Phone Number: <span id='currentPhoneValidation"+n+"' class='allValidationText'></span></b></label> <input class='form-control' type='text' name='phone' id='phone"+accountdata.user_phone.user_phone_id+"' value='"+accountdata.user_phone.user_phone_number +"'/></div>");
        }
        else {

         $.each(phoneNos, function(n, pho) {
             $("#accountContent").append("<div class='form-group"+n+"'><label for='phonefield"+n+"'>"+ accountdata.user_phone[n].user_phone_name + " Phone Number: <span id='currentPhoneValidation"+n+"' class='allValidationText'></span></b></label> <input class='form-control' type='text' name='phone' id='phone"+accountdata.user_phone[n].user_phone_id+"' value='"+accountdata.user_phone[n].user_phone_number +"'/></div>");
        });
     }
         
  $("#accountContent").append("<div class='updateSubmitError'>There was an error with your submission. Please try again.</div><div class='submitButtons'><button type='submit' class='btn btn-zano' onClick='submitDetailsForm()'>Submit</button></div> ");
  $("#accountContent .submitButtons").append(" <button type='submit' class='btn btn-zano' onClick='loadAccountInfo(1)'>Cancel</button>");

}).fail(function() {
    notLoggedIn();
  });
}

function fadeElements() {
    $(".circleHolder").fadeTo( "fast" , 0.2);
    $("#zanoStats").fadeTo( "fast" , 0.2);
    $("#lastLogged").fadeTo( "fast" , 0.2);
    $("#accountContent").fadeTo( "fast" , 0.2);
}

function addEmailAddress(){
    fadeElements();
    $("#toolFormHolder").append("<div class='form-group'><label for='newEmailLabel''> Email address title (work, home etc) </label> <input class='form-control' type='text' name='newEmailLabel' id='newEmailFieldLabel' value=''/> </div>");
    $("#toolFormHolder").append("<div class='form-group'><label for='newEmail''> Email address <span id='newEmailValidationText'></span></b></label> <input class='form-control' type='text' name='newEmail' id='newEmailField' value=''/> </div>");
    $("#toolFormHolder").append("<div class='addEmailError'>There was an error with your submission. Please try again.</div><div class='emailSubmitButtons'><button type='submit' class='btn btn-zano' onClick='submitNewEmail()'>Submit</button> </div>");
    $("#toolFormHolder .emailSubmitButtons").append(" <button type='submit' class='btn btn-zano' onClick='loadAccountInfo(1)'>Cancel</button>");
    $("#toolFormHolder").fadeIn();
    $(".formTools").hide();
}

function addPhoneNumber(){
    fadeElements();
    $("#toolFormHolder").append("<div class='form-group'><label for='emailFieldLabel'> Add new phone title (work, home etc) </label> <input class='form-control' type='text' name='phoneLabel' id='phoneNoLabel' value=''/> </div>");
    $("#toolFormHolder").append("<div class='form-group'><label for='emailField'> Add new phone number <span id='newPhoneValidation'></span></b></label> <input class='form-control' type='text' name='email' id='phoneNo' value=''/> </div>");
    $("#toolFormHolder").append("<div class='addPhoneError'>There was an error with your submission. Please try again.</div><div class='phoneSubmitButtons'><button type='submit' class='btn btn-zano' onClick='submitPhoneNumber()'>Submit</button> </div>");
    $("#toolFormHolder .phoneSubmitButtons").append("<button type='submit' class='btn btn-zano' onClick='loadAccountInfo(1)'>Cancel</button>");
    $("#toolFormHolder").fadeIn();
    $(".formTools").hide();
}

function changePassword(){
    fadeElements();
    $("#toolFormHolder").append("<div class='form-group'><label for='newPW'> Enter new Password </label> <span id='newPWValidation'></span><input class='form-control' type='password' name='email' id='newPW' value=''/> </div>");
    $("#toolFormHolder").append("<div class='form-group'><label for='repeatnewPW'> Repeat new Password </label><span id='emailValidationTextMis'></span><input class='form-control' type='password' name='repeatPW' id='repeatnewPW' value=''/> </div>");
    $("#toolFormHolder").append("<div class='updatePasswordError'>There was an error with your submission. Please try again.</div><div class='passwordSubmitButtons'><button type='submit' class='btn btn-zano' onClick='submitNewPassword()'>Submit</button> </div>");
    $("#toolFormHolder .passwordSubmitButtons").append("<button type='submit' class='btn btn-zano' onClick='loadAccountInfo(1)'>Cancel</button>");
    $("#toolFormHolder").fadeIn();
    $(".formTools").hide();
}

function validateEmail(mail)   
{  
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))  
  {  
    return (true);
  }  
    return (false);
} 


function submitDetailsForm() {

    verifyUser();

    submit = true; 

    for (i = 0; i < $("#accountContent .emailField").length; i++) { 

        if (!validateEmail($("#accountContent .email" + i).val())) {

            $("#currentEmailValidation" + i).html("") ;
            $("#currentEmailValidation" + i).append(" - This is an invalid Email Address") ;

            submit = false; 

        } else {$("#currentEmailValidation" + i).html(""); }
    }  

    for (i = 0; i < $("#accountContent [id^=phonefield]").length; i++) { 

        if (!$.isNumeric($("#accountContent #phonefield" + i).val())) {

            $("#currentPhoneValidation" + i).html("") ;
            $("#currentPhoneValidation" + i).append(" - This is an invalid phone number");  

            submit = false;

        } else {$("#currentPhoneValidation" + i).html(""); }
    }  

    if (submit) {

        var emailArray = [];
        var phoneArray = [];


        for (i = 0; i < $("#accountContent input").length; i++) { 

            var fieldType = $("#accountContent input:nth("+i+")").attr('id').slice(0,5);
            var fieldId = $("#accountContent input:nth("+i+")").attr('id').slice(5);
            var fieldValue = $("#accountContent input:nth("+i+")").val();

            if (fieldType == "phone") {
                var jsonBuild = {
                    user_id: globalID,
                    auth_token: globalAuth,
                    phone_id : fieldId ,
                    phone_value: fieldValue 
                };
            } else
                var jsonBuild = {
                    user_id: globalID,
                    auth_token: globalAuth,
                    email_id : fieldId ,
                    email_value: fieldValue 
                
            };

            jQuery.ajax({
                type: 'POST',
                url: apiRoot + "api/user/data/update",
                data: jsonBuild,
                dataType: "json",
                timeout: 2000,
                success: function(result){
                    loadAccountInfo('1');
                },
                error: function (xhr, ajaxOptions, thrownError){
                    $(".updateSubmitError").show();
                }
            });
        }
    }
}

function submitNewEmail() {

    verifyUser();

    if (validateEmail($("#newEmailField").val())) {

        var jsonBuild = {
            user_id: globalID,
            auth_token: globalAuth,
            email_label: $("#newEmailFieldLabel").val(),
            email: $("#newEmailField").val()
        };

        jQuery.ajax({
            type: 'POST',
            url: apiRoot + "api/user/data/add",
            data: jsonBuild,
            dataType: "json",
            timeout: 2000,
            success: function(result){
             
                loadAccountInfo('1');
            },
            error: function (xhr, ajaxOptions, thrownError){
            
                 $(".addEmailError").show();
            }
        });   

    } else {

        $("#newEmailValidationText").html(" - Please enter a valid email address.");
    }

}

function submitPhoneNumber() {

    verifyUser();

     if ($.isNumeric($("#phoneNo").val())) {

        var jsonBuild = {
            user_id: globalID,
            auth_token: globalAuth,
            phone_label: $("#phoneNoLabel").val(),
            phone: $("#phoneNo").val()
        };

        jQuery.ajax({
            type: 'POST',
            url: apiRoot + "api/user/data/add",
            data: jsonBuild,
            dataType: "json",
            timeout: 2000,
            success: function(result){
                loadAccountInfo('1');
            },
            error: function (xhr, ajaxOptions, thrownError){
                $(".addPhoneError").show();
            }
        });

    } else {

        $("#newPhoneValidation").html(" - Please enter a valid phone number.");
    }

}

function submitNewPassword() {

    verifyUser();

    if ($("#repeatnewPW").val() == $("#newPW").val()  ) {

         var jsonBuild = {
            user_id: globalID,
            auth_token: globalAuth,
            pass: md5($("#newPW").val())
        };

        var jsonString = JSON.stringify(jsonBuild);

        jQuery.ajax({
            type: 'POST',
            url: apiRoot +'api/auth/password/change',
            data: jsonBuild,
            dataType: "json",
            timeout: 2000,
            success: function(result){
                loadAccountInfo('1');
            },
            error: function (xhr, ajaxOptions, thrownError){
                $(".updatePasswordError").show();
            }
        });
    }

    if ($("#repeatnewPW").val() === $("#newPW").val()) {
        $("#emailValidationTextMis").html("");
        $("#newPWValidation").html("");
    }
    
    if ($("#repeatnewPW").val() != $("#newPW").val()   ) {
        $("#emailValidationTextMis").html(" - Mismatched Passwords");
        $("#newPWValidation").html(" - Mismatched Passwords");
    } else {
        $("#emailValidationTextMis").html("");
        $("#newPWValidation").html("");
    }

    if ($("#repeatnewPW").val() === ""   ) {
        $("#emailValidationTextMis").html(" - Enter a new password");
    }

    if ($("#newPW").val() === ""   ) {
        $("#newPWValidation").html(" - Enter a new password");
    }

}

loadAccountInfo('all');