/* @preserve
  _____   _    _   _  ___
 |__  /  / \  | \ | |/ _ \   
   / /  / _ \ |  \| | | | |  
  / /_ / ___ \| |\  | |_| | 
 /____/_/   \_\_| \_|\___/   
  C A P T U R E   L I F E
                                                                                                 
 */

function loadMyZano(){

    $("#myZanoContent").html("<div class='zanosLightbox'></div>");

    verifyUser();

     var userPostArray = {
        user_id :  globalID,
        auth_token : globalAuth
    };

    $.post( apiRoot + "api/zanos/all", userPostArray, function( data ) {

         $("#myZanoContent").html("<div class='zanosLightbox'></div>");

        var  zanoData = data.data;

        if (zanoData.data === null || zanoData.length === 0) { $("#myZanoContent").html("You currently have no ZANOs registered");} 

        else {
        if ($.type(zanoData) != "array") {
                     $("#myZanoContent").append("<hr class='zanoHR'>")
                    $("#myZanoContent").append("<div class='zano-"+zanoData.device_id+"'></div>");
                    $("#myZanoContent .zano-"+zanoData.device_id).append("<h2>" + zanoData.device_name +  "<span class='deviceTitleStatus'></span></h2>   <br>");
                    $("#myZanoContent .zano-"+zanoData.device_id).append("<div id='zano"+zanoData.device_id+"' class='circleWiderHolder'><div class='circleHolder' id='zano"+zanoData.device_id+"'><div class='outer-circle'><div class='inner-circle'><div class='dash-info-header'><div class='units flown'><span class='comingSoon'>Coming Soon</span></div><div class='dash-info-subheader flownunit'><p>Minutes Flown</p></div></div></div></div></div><div class='circleHolder'><div class='outer-circle'><div class='inner-circle'><div class='dash-info-header'><div class='units flights'><span class='comingSoon'>Coming Soon</span></div><div class='dash-info-subheader'><p>Flights</p></div></div></div></div></div><div class='circleHolder'><div class='outer-circle'><div class='inner-circle'><div class='dash-info-header'><div class='units photos'><span class='comingSoon'>Coming Soon</span></div><div class='dash-info-subheader'><p>Photos Taken</p></div></div></div></div></div><div class='circleHolder'><div class='outer-circle'><div class='inner-circle'><div class='dash-info-header'><div class='units videos'><span class='comingSoon'>Coming Soon</span></div><div class='dash-info-subheader videounit'><p>Hours of Video</p></div></div></div></div></div><div class='circleHolder'><div class='outer-circle'><div class='inner-circle'><div class='dash-info-header'><div class='units maxtime'><span class='comingSoon'>Coming Soon</span></div><div class='dash-info-subheader maxflightunit'><p>Longest Flight</p></div></div></div></div></div><div class='circleHolder'><div class='outer-circle'><div class='inner-circle'><div class='dash-info-header'><div class='units altitude'><span class='comingSoon'>Coming Soon</span></div><div class='dash-info-subheader'><p>Highest Altitude (meters)</p></div></div></div></div></div></div>");

                   //$("#myZanoContent .zano-"+zanoData.device_id).append("<br clear='both'><br>Device type: " + zanoData.device_type +  "<br>");

                    $("#myZanoContent .zano-"+zanoData.device_id).append("<br>WiFi ID: " + zanoData.device_ssid +  "<br>");
                     $("#myZanoContent .zano-"+zanoData.device_id).append("WiFi Password: " + zanoData.device_ssid_pass +  "<br>");

                   // $("#myZanoContent .zano-"+zanoData.device_id).append("Firmware: " +zanoData.device_fw_major + "-" + zanoData.device_fw_minor + "-" + zanoData.device_fw_revision +   "<br>");

                   $("#myZanoContent .zano-"+zanoData.device_id).append("Serial Number: " + zanoData.device_sn +  "<br>");
                    $("#myZanoContent .zano-"+zanoData.device_id).append("Registered: " + zanoData.device_register_ts+  "<br><br>");

                    //$("#myZanoContent .zano-"+zanoData.device_id).append("<div class='zanoButtons'><div id='device"+zanoData.device_id+"'><a href='javascript:unregisterZanoConfirm("+zanoData.device_id+")'><button type='submit' class='btn btn-zano' >UNREGISTER</button></a> <a href='javascript:renameZano(\"" + zanoData.device_name+ "\"" + "," + zanoData.device_id+ ")'><button type='submit' class='btn btn-zano' >RENAME</button></a></div></div><div class='renameZano"+zanoData.device_id+"'></div>");
                   //$("#myZanoContent .zano-"+zanoData.device_id).append("<div class='zanoButtons'><div id='device"+zanoData.device_id+"'><a href='javascript:unregisterZanoConfirm("+zanoData.device_id+")'><button type='submit' class='btn btn-zano' >UNREGISTER</button></a> <a href='javascript:renameZano(\"" + zanoData.device_name+ "\"" + "," + zanoData.device_id+ ")'><button type='submit' class='btn btn-zano' >RENAME</button></a> <a href='javascript:reportLostStolen(\"" + zanoData.device_name+ "\"" + "," + zanoData.device_id+ ")'><button type='submit' class='btn btn-zano' >REPORT LOST / STOLEN</button></a></div></div><div class='renameZano"+zanoData.device_id+"'></div>");

                    getStats(zanoData.device_id);
                    getStolenStatus(zanoData.device_id, zanoData.device_name);
       }
       else {

             $.each(zanoData, function(i, value){
                    $("#myZanoContent").append("<hr class='zanoHR'>")
                    $("#myZanoContent").append("<div class='zano-"+zanoData[i].device_id+"'></div>");
                    $("#myZanoContent .zano-"+zanoData[i].device_id).append("<h2>" + zanoData[i].device_name +  "<span class='deviceTitleStatus'></span></h2>   <br>");
                    $("#myZanoContent .zano-"+zanoData[i].device_id).append("<div id='zano"+zanoData[i].device_id+"' class='circleWiderHolder'><div class='circleHolder'><div class='outer-circle'><div class='inner-circle'><div class='dash-info-header'><div class='units flown'><span class='comingSoon'>Coming Soon</span></div><div class='dash-info-subheader flownunit'><p>Minutes Flown</p></div></div></div></div></div><div class='circleHolder'><div class='outer-circle'><div class='inner-circle'><div class='dash-info-header'><div class='units flights'><span class='comingSoon'>Coming Soon</span></div><div class='dash-info-subheader'><p>Flights</p></div></div></div></div></div><div class='circleHolder'><div class='outer-circle'><div class='inner-circle'><div class='dash-info-header'><div class='units photos'><span class='comingSoon'>Coming Soon</span></div><div class='dash-info-subheader'><p>Photos Taken</p></div></div></div></div></div><div class='circleHolder'><div class='outer-circle'><div class='inner-circle'><div class='dash-info-header'><div class='units videos'><span class='comingSoon'>Coming Soon</span></div><div class='dash-info-subheader videounit'><p>Hours of Video</p></div></div></div></div></div><div class='circleHolder'><div class='outer-circle'><div class='inner-circle'><div class='dash-info-header'><div class='units maxtime'><span class='comingSoon'>Coming Soon</span></div><div class='dash-info-subheader maxflightunit'><p>Longest Flight</p></div></div></div></div></div><div class='circleHolder'><div class='outer-circle'><div class='inner-circle'><div class='dash-info-header'><div class='units altitude'><span class='comingSoon'>Coming Soon</span></div><div class='dash-info-subheader'><p>Highest Altitude (meters)</p></div></div></div></div></div></div>");

                    //$("#myZanoContent .zano-"+zanoData[i].device_id).append("<br clear='both'><br>Device type: " + zanoData[i].device_type +  "<br>");
                    $("#myZanoContent .zano-"+zanoData[i].device_id).append("<br>WiFi ID: " + zanoData[i].device_ssid +  "<br>");

                    $("#myZanoContent .zano-"+zanoData[i].device_id).append("WiFi Password: " + zanoData[i].device_ssid_pass +  "<br>");

                    //$("#myZanoContent .zano-"+zanoData[i].device_id).append("Firmware: " +zanoData[i].device_fw_major + "-" + zanoData[i].device_fw_minor + "-" + zanoData[i].device_fw_revision +   "<br>");
                    
                     $("#myZanoContent .zano-"+zanoData[i].device_id).append("Serial Number: " + zanoData[i].device_sn+  "<br>");
                    $("#myZanoContent .zano-"+zanoData[i].device_id).append("Registered: " + zanoData[i].device_register_ts+  "<br><br>");

                    //$("#myZanoContent .zano-"+zanoData[i].device_id).append("<div class='zanoButtons'><div id='device"+zanoData[i].device_id+"'><a href='javascript:unregisterZanoConfirm("+zanoData[i].device_id+")'><button type='submit' class='btn btn-zano' >UNREGISTER</button></a> <a href='javascript:renameZano(\"" + zanoData[i].device_name+ "\"" + "," + zanoData[i].device_id+ ")'><button type='submit' class='btn btn-zano' >RENAME</button></a></div></div><div class='renameZano"+zanoData[i].device_id+"'></div>");
                   //$("#myZanoContent .zano-"+zanoData[i].device_id).append("<div class='zanoButtons'><div id='device"+zanoData[i].device_id+"'><a href='javascript:unregisterZanoConfirm("+zanoData[i].device_id+")'><button type='submit' class='btn btn-zano' >UNREGISTER</button></a> <a href='javascript:renameZano(\"" + zanoData[i].device_name+ "\"" + "," + zanoData[i].device_id+ ")'><button type='submit' class='btn btn-zano' >RENAME</button></a> <a href='javascript:reportLostStolen(\"" + zanoData[i].device_name+ "\"" + "," + zanoData[i].device_id+ ")'><button type='submit' class='btn btn-zano' >REPORT LOST / STOLEN</button></a></div></div><div class='renameZano"+zanoData[i].device_id+"'></div>");

                    getStats(zanoData[i].device_id);
                    getStolenStatus(zanoData[i].device_id, zanoData[i].device_name);
         }); 
     }
 }

    }).fail(function() {
     $("#myZanoContent").html(loginError());
  });

}

function reportLost(zanoName, zanoID){

    lightboxHeight = Math.max($(".accountContent").height()); 
    $(".zanosLightbox").height(lightboxHeight);

    passedName = JSON.stringify(zanoName)

    $(".renameZano" + zanoID).css({"position": "absolute", "z-index": "10"});
    $("#myZanoContent .zano-"+zanoID).css({"margin-bottom": "53px"});
    $(".zanosLightbox").fadeIn();

    $(".zanoButtons #device" + zanoID).hide();
    $(".renameZano" + zanoID).html("Confirm lost or stolen? <button type='submit' class='btn btn-zano' onClick='confirmLost("+zanoID+")'>Yes</button> <button type='submit' class='btn btn-zano' onClick='cancelZanoSubmit("+zanoID+")'>No</button>");   
    
    $(".zanosLightbox").click(function() {
        cancelZanoSubmit(zanoID)
    });
}

function reportFound(zanoName, zanoID){

    lightboxHeight = Math.max($(".accountContent").height()); 
    $(".zanosLightbox").height(lightboxHeight);

    passedName = JSON.stringify(zanoName)

    $(".renameZano" + zanoID).css({"position": "absolute", "z-index": "10"});
    $("#myZanoContent .zano-"+zanoID).css({"margin-bottom": "53px"});
    $(".zanosLightbox").fadeIn();

    $(".zanoButtons #device" + zanoID).hide();
    $(".renameZano" + zanoID).html("Confirm as found? <button type='submit' class='btn btn-zano' onClick='confirmFound("+zanoID+")'>Yes</button> <button type='submit' class='btn btn-zano' onClick='cancelZanoSubmit("+zanoID+")'>No</button>");   
    
    $(".zanosLightbox").click(function() {
        cancelZanoSubmit(zanoID)
    });
}

function renameZano(zanoName, zanoID){

    lightboxHeight = Math.max($(".accountContent").height()); 
    $(".zanosLightbox").height(lightboxHeight);

    passedName = JSON.stringify(zanoName)

    $(".renameZano" + zanoID).css({"position": "absolute", "z-index": "10"});
    $("#myZanoContent .zano-"+zanoID).css({"margin-bottom": "53px"});
    $(".zanosLightbox").fadeIn();

    $(".zanoButtons #device" + zanoID).hide();
    $(".renameZano" + zanoID).html("<input class='form-control zanoNewName' type='text' name='zanoName' id='zanoName' value="+passedName+" maxlength='32'/><button type='submit' class='btn btn-zano' onClick='renameZanoSubmit("+zanoID+")'> Submit</button> <button type='submit' class='btn btn-zano' onClick='cancelZanoSubmit("+zanoID+")'>Cancel</button>");   
    
    $(".zanosLightbox").click(function() {
        cancelZanoSubmit(zanoID)
    });
}


function renameZanoSubmit(zanoID){

    var userPostArray = {
        user_id :  globalID,  
        auth_token : globalAuth,
        device_id : zanoID,
        device_name: $("#zanoName").val()
    }; 

     $.post( apiRoot + "api/zanos/rename", userPostArray, function( data ) {

            loadStatic('myzano')

    }).fail(function() {
      $(".renameZano" + zanoID).prepend("<br><br>There was an error, please try again later.")
  });
    
}

function confirmLost(zanoID){

    var userPostArray = {
        user_id :  globalID,  
        auth_token : globalAuth,
        device_id : zanoID,
        device_lost: 1
    }; 

     $.post( apiRoot + "api/zanos/lost", userPostArray, function( data ) {

            loadStatic('myzano')

    }).fail(function() {
      $(".renameZano" + zanoID).prepend("<br><br>There was an error, please try again later.")
  });
    
}

function confirmFound(zanoID){

    var userPostArray = {
        user_id :  globalID,  
        auth_token : globalAuth,
        device_id : zanoID,
        device_lost: 0
    }; 

     $.post( apiRoot + "api/zanos/lost", userPostArray, function( data ) {

            loadStatic('myzano')

    }).fail(function() {
      $(".renameZano" + zanoID).prepend("<br><br>There was an error, please try again later.")
  });
    
}


function cancelZanoSubmit(zanoID) {

    $(".renameZano" + zanoID).css({"position": "relative", "z-index": "10"});
    $("#myZanoContent .zano-"+zanoID).css({"margin-bottom": "0px"});
    $(".zanosLightbox").fadeOut();

    $(".renameZano" + zanoID).html(""); 
    $(".zanoButtons #device" + zanoID).show();

}

function getStolenStatus(zanoID, zanoName){

  var userPostArray = {
        user_id :  globalID,  
        auth_token : globalAuth,
        device_id : zanoID
    }; 


    $.post( apiRoot + "api/zanos/status", userPostArray, function( data ) {

        var  stolenData = data.data;

        // Total number of flights
        if (stolenData.device_lost > 0) {
          $("#myZanoContent .zano-"+zanoID).append("<div class='zanoButtons'><div id='device"+zanoID+"'> <a href='javascript:reportFound(\"" + zanoName+ "\"" + "," + zanoID+ ")'><button type='submit' class='btn btn-zano' >REPORT AS FOUND</button></a></div></div><div class='renameZano"+zanoID+"'></div>");
          $("#myZanoContent .zano-"+zanoID+ " .deviceTitleStatus").html("  - Reported as lost / stolen")
        } else {
              $("#myZanoContent .zano-"+zanoID).append("<div class='zanoButtons'><div id='device"+zanoID+"'><a href='javascript:unregisterZanoConfirm("+zanoID+")'><button type='submit' class='btn btn-zano' >UNREGISTER</button></a><a href='javascript:renameZano(\"" + zanoName+ "\"" + "," + zanoID+ ")'><button type='submit' class='btn btn-zano' >RENAME</button></a><a href='javascript:reportLost(\"" + zanoName+ "\"" + "," + zanoID+ ")'><button type='submit' class='btn btn-zano' >REPORT LOST / STOLEN</button></a><a href='javascript:changeFlightFrame(" + zanoID+ ")'><button type='submit' class='btn btn-zano' >REGISTER NEW FLIGHT FRAME</button></a></div></div><div class='renameZano"+zanoID+"'></div>");
        }

    }).fail(function() {
     
  });

}

function changeFlightFrame(zanoID){

  newFrameDeviceID = zanoID;

  $( ".mainContent" ).load("new_frame.html?ID=" + zanoID);

}

function getStats(zanoID) {

     var userPostArray = {
        user_id :  globalID,  
        auth_token : globalAuth,
        device_id : zanoID
    }; 

    $.post( apiRoot + "api/zanos/metrics", userPostArray, function( data ) {

        var  metricData = data.data;

        // Total number of flights
        if (metricData.num_flights > 0) {
            $("#zano" + zanoID + " .flights").html(metricData.num_flights);
        } else {
            $("#zano" + zanoID + " .flights").html('<span class="comingSoon">Coming Soon</span>');
        }

        // Highest altitude
        if (metricData.max_height > 0) {
            $("#zano" + zanoID + " .altitude").html(metricData.max_height  / 1000 );
        } else {
            $("#zano" + zanoID + " .altitude").html('<span class="comingSoon">Coming Soon</span>');
        }

        // Total number of photos
        if (metricData.num_photos > 0) {
            $("#zano" + zanoID + " .photos").html(metricData.num_photos);
        } else {
            $("#zano" + zanoID + " .photos").html('<span class="comingSoon">Coming Soon</span>');
        }

        // Longest single flight time
        if (metricData.max_secs_flown > 0) {
            if (metricData.max_secs_flown  < 61) {
                $("#zano" + zanoID + " .maxtime").html(metricData.max_secs_flown );
                $("#zano" + zanoID + " .maxflightunit").html("<p>Longest Flight (seconds)</p>");
            }

            if (metricData.max_secs_flown < 3600 && metricData.max_secs_flown  > 60) {
                $("#zano" + zanoID + " .maxtime").html(parseInt(metricData.max_secs_flown  / 60));
                $("#zano" + zanoID + " .maxflightunit").html("<p>Longest Flight (minutes)</p>");
            }

            if (metricData.max_secs_flown  > 3600) {
                $("#zano" + zanoID + ".maxtime").html(parseInt(metricData.max_secs_flown  / 3600));
                
                if (parseInt(metricData.max_secs_flown  / 3600) == 1) {
                    $("#zano" + zanoID + " .maxflightunit").html("<p>Longest Flight (hours)</p>");
                } else {
                    $("#zano" + zanoID + " .maxflightunit").html("<p>Longest Flight (hours)</p>");
                }
            }

        } else {
            $("#zano" + zanoID + " .maxtime").html('<span class="comingSoon">Coming Soon</span>');
           
        }

        // Total Flight Time
        if (metricData.secs_flown > 0) {
            if (metricData.secs_flown < 61) {
                $("#zano" + zanoID + " .flown").html(metricData.secs_flown);
                $("#zano" + zanoID + " .flownunit").html("<p>Rotal Flight Time (seconds)</p>");
            }

            if (metricData.secs_flown < 3600 && metricData.secs_flown > 60) {
                $("#zano" + zanoID + " .flown").html(parseInt(metricData.secs_flown / 60));
                $("#zano" + zanoID + " .flownunit").html("<p>Total Flight Time (minutes)</p>");
            }

            if (metricData.secs_flown > 3600) {
                $("#zano" + zanoID + " .flown").html(parseInt(metricData.secs_flown / 3600));
                
                if (parseInt(metricData.secs_flown / 3600) == 1) {
                    $("#zano" + zanoID + " .flownunit").html("<p>Total Flight Time (hour)</p>");
                } else {
                    $("#zano" + zanoID + " .flownunit").html("<p>Total Flight Time (hours)</p>");
                }
            }

        } else {
            $("#zano" + zanoID + " .flown").html('<span class="comingSoon">Coming Soon</span>');
           
        }

        // Total length of video recorded
        if (metricData.secs_video > 0) {
            if (metricData.secs_video < 61) {
                $("#zano" + zanoID + " .videos").html(metricData.secs_video);
                $("#zano" + zanoID + " .videounit").html("<p>Seconds of Video</p>");
            }

            if (metricData.secs_video < 3600 && metricData.secs_video > 60) {
                $("#zano" + zanoID + " .videos").html(parseInt(metricData.secs_video / 60));
                $("#zano" + zanoID + " .videounit").html("<p>Minutes of Video</p>");
            }

            if (metricData.secs_video > 3600) {
                $("#zano" + zanoID + " .videos").html(parseInt(metricData.secs_video / 3600));
                
                if (parseInt(metricData.secs_video / 3600) == 1) {
                    $("#zano" + zanoID + " .videounit").html("<p>Hour of Video</p>");
                } else {
                    $("#zano" + zanoID + " .videounit").html("<p>Hours of Video</p>");
                }
            }

        } else {
            $("#zano" + zanoID + " .videos").html('<span class="comingSoon">Coming Soon</span>');
        }

    }).fail(function() {
     
  });

}

function dontUnregister(deviceID){
    loadMyZano();
}

function doUnregister(deviceID){

     verifyUser();

     var userPostArray = {
        user_id :  globalID,
        auth_token : globalAuth,
        device_id: deviceID
    };

    $.post( apiRoot + "api/zanos/deregister", userPostArray, function( data ) {

            loadMyZano();

    }).fail(function() {
      $("#device"+deviceID).html("There was an error unregsitering your ZANO.")
  });

}

function unregisterZanoConfirm(deviceID) {
    $("#device"+deviceID).html("Are you sure? <a href='javascript:doUnregister("+deviceID+")'><button type='submit' class='btn btn-zano' >YES</button></a> <a href='javascript:dontUnregister("+deviceID+")'><button type='submit' class='btn btn-zano' >NO</button></a>" )

}

loadMyZano();