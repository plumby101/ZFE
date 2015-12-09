/* @preserve
  _____   _    _   _  ___
 |__  /  / \  | \ | |/ _ \   
   / /  / _ \ |  \| | | | |  
  / /_ / ___ \| |\  | |_| | 
 /____/_/   \_\_| \_|\___/   
  C A P T U R E   L I F E
                                                                                                 
  */

// 'Does it contain' array tool
Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] == obj) {
            return true;
        }
    }
    return false;
};

mediaArray = []
intervalArray = []
viewState = "parents"

// 'How many instances of specific value' array tool
Array.prototype.count = function(obj){
    var count = this.length;
    if(typeof(obj) !== "undefined"){
        var array = this.slice(0), count = 0; // clone array and reset count
        for(i = 0; i < array.length; i++){
            if(array[i] == obj){
                count++;
            }
        }
    }
    return count;
};

Array.prototype.multiIndexOf = function (el) { 
    var idxs = [];
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] === el) {
            idxs.unshift(i);
        }
    }
    return idxs;
};

//Function for double tapping - showing preview video
function doubleclick(el, mediaType, mediaID) {

    if (enableOnclick){

        if (el.getAttribute("data-dblclick") == null) {
            el.setAttribute("data-dblclick", 1);
            setTimeout(function () {
                if (el.getAttribute("data-dblclick") == 1) {
                    showMediaLightbox(mediaType,mediaID);
                }
                el.removeAttribute("data-dblclick");
            }, 300);
        } else {
            if (mediaType == "1") {
                el.removeAttribute("data-dblclick");

                showMediaLightbox(mediaType,mediaID);
                // $("#m"+ mediaID + " .mediaThumbnail").css('background-image', 'none');
                // $("#m"+ mediaID + " .mediaThumbnail").css({ 'background-color': '#ffffff' });
                // $("#m"+ mediaID + " .mediaThumbnail").html("PREVIEW VIDEO");

            }
        }
    }
}

(function($) {
$.fn.nodoubletapzoom = function() {
    $(this).bind('touchstart', function preventZoom(e){
        var t2 = e.timeStamp;
        var t1 = $(this).data('lastTouch') || t2;
        var dt = t2 - t1;
        var fingers = e.originalEvent.touches.length;
        $(this).data('lastTouch', t2);
        if (!dt || dt > 500 || fingers > 1){
            return; // not double-tap
        }
        e.preventDefault(); // double tap - prevent the zoom
        // also synthesize click events we just swallowed up
        $("#m"+ mediaID + " .mediaThumbnail").css('background-image', 'none');
        $("#m"+ mediaID + " .mediaThumbnail").css({ 'background-color': '#ffffff' });
        $("#m"+ mediaID + " .mediaThumbnail").html("PREVIEW VIDEO");
    });
};
})(jQuery);

function removeItem(array, item){
    for(var i in array){
        if(array[i]==item){
            array.splice(i,1);
            break;
            }
    }
}

// Rename title of media elemeents 
function saveNewTitle(mediaID){

    var userPostArray = {
        user_id :  globalID,
        auth_token : globalAuth,
        media_id: mediaID,
        media_title: $(".changeTitleInput").val()
    };

    $.post( apiRoot + "api/media/changetitle", userPostArray, function( data ) {

      ga('send', 'event', 'Change title', 'Clicked');
      closeShareOverlay();
      getMedia();

    }).fail(function() {
        $(".overylayCloseHolder").prepend("Error, please retry.");
    });
}

function confirmDeleteMany(){

    if (storedIDs.length > 0){

    storedIDsJSON = JSON.stringify(storedIDs);

    var userPostArray = {
        user_id :  globalID,
        auth_token : globalAuth,
        media_ids: storedIDsJSON
    };

 $.post( apiRoot + "api/media/deletemany", userPostArray, function( data ) {

      ga('send', 'event', 'Delete many', 'Clicked');
      getMedia();

    }).fail(function() {

      ga('send', 'event', 'Delte many fail', 'Clicked');
        $(".deleteMany").html("Error. <a href='javascript:confirmDeleteMany()'><button type='submit' class='btn btn-zano '>Yes</button></a> <a href='javascript:cancelDeleteConfirm()'><button type='submit' class='btn btn-zano '>No</button></a> ");

    });
    }
    else { $(".deleteMany").html("Please select some items. <a href='javascript:cancelDeleteMany()'><button type='submit' class='btn btn-zano '> Cancel</button></a> <a href='javascript:deleteManyConfirm()'><button type='submit' class='btn btn-zano '>Confirm Delete</button></a>");}

}

function deleteManyConfirm(){  

    if (storedIDs.length > 1) {items = "items"}
    else {items = "item"} 

        $(".deleteMany").html("Are you sure (<span class='totalItems'>"+ storedIDs.length + "</span> " +items+") ? <a href='javascript:confirmDeleteMany()'><button type='submit' class='btn btn-zano '>Yes</button></a> <a href='javascript:cancelDeleteConfirm()'><button type='submit' class='btn btn-zano '>No</button></a> ");

}

function cancelDeleteConfirm() {

     $(".deleteMany").html("<a href='javascript:cancelDeleteMany()'><button type='submit' class='btn btn-zano '> Cancel</button></a> <a href='javascript:deleteManyConfirm()'><button type='submit' class='btn btn-zano '>Confirm Delete</button></a>");
}

function deleteMany() {

    enableOnclick = false;

    $(".mediaEnhancements").fadeOut();
    $(".mediaType").fadeOut();
    $(".mediaFunctions").fadeOut();
    $(".stackedMedia").fadeTo( "slow" , 0.2);
    $(".selectThis").fadeIn();

    $(".mediaViewMore").css('z-index', '2');

    $(".deleteMany").html("<div class='visible-xs'>Tap on an image to select.</div><a href='javascript:cancelDeleteMany()'><button type='submit' class='btn btn-zano '> Cancel</button></a> <a href='javascript:deleteManyConfirm()'><button type='submit' class='btn btn-zano '>Confirm Delete</button></a>");

    if (screen.width < 450) {
     $(".deleteMany").css('width', '100%');
 }   
}

function cancelDeleteMany() {

    enableOnclick = true;

    $(".mediaEnhancements").fadeIn();
    $(".mediaType").fadeIn();
    $(".mediaFunctions").fadeIn();
    $(".stackedMedia").fadeTo( "slow" , 1);
    $(".selectThis").fadeOut();
    $(".mediaViewMore").css('z-index', '6');
    
    if (screen.width < 450) {
     $(".deleteMany").css('width', '10%');
    }   
    else {
     $(".deleteMany").css('width', '50%');
    }

    $(".deleteMany").html("<a href='javascript:deleteMany()'><img src='images/deleteMany.png' height='32px' width='32px'></a>");
}

function addThisID(ID){
    storedIDs.push(ID);
    $(".totalItems").html(storedIDs.length);
    $("#m"+ID +" .selectThis").html("<a href='javascript:removeThisID("+ID+")'><img src='//account.flyzano.com/images/mediaChecked.png' /></a>");
}

function removeThisID(ID){
    removeItem(storedIDs, ID);
    $(".totalItems").html(storedIDs.length);
     $("#m"+ID +" .selectThis").html("<a href='javascript:addThisID("+ID+")'><img src='//account.flyzano.com/images/mediaUnchecked.png' /></a>");
}

function showOverlay (mediaID, mediaType){

    lightboxHeight = Math.max($("body").height(), $(document).height(), screen.availHeight); 

    $(".mediaLightBoxBG").height(lightboxHeight);

    var x = $("#m"+mediaID).position();

    // Position the overlay over the clicked media
    if (mediaType == "enhance") {
         $(".videoOverlay").css({top: x.top + parseInt($("#m"+mediaID).css("margin-top"))-12, left: x.left + parseInt($("#m"+mediaID).css("margin-left"))});
    }
    else { 
        $(".videoOverlay").css({top: x.top + parseInt($("#m"+mediaID).css("margin-top")), left: x.left + parseInt($("#m"+mediaID).css("margin-left"))});
    }
   
    $(".videoOverlay").fadeIn();
    $(".mediaLightBoxBG").fadeIn();

    // Variation for mobile use

    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        var element = $("#m" + mediaID);
        var offset =  element.offset().top - 50;
        $('html, body').animate({ scrollTop: offset + 15 }, 500);
    }

}

function closeLighbox(){
   $(".mediaLightbox").fadeOut();
   $(".mediaLightBoxBG").fadeOut();
}

function extractUrl(input) {
    return input.replace(/"/g,"").replace(/url\(|\)$/ig, "");
}

function initiateOverlay(task, mediaID, mediaType) {
    if (task == "share") {
        if (makeShareOverlay(mediaID, mediaType)){showOverlay(mediaID, task);}
    }

    if (task == "enhance") {
        if(makeEnhanceOverlay(mediaID, mediaType)){showOverlay(mediaID, task);}
    }
}

function showMediaLightbox(mediaType, mediaID) {

    lightboxHeight = Math.max($("body").height(), $(document).height(), screen.availHeight); 

    $(".mediaLightBoxBG").height(lightboxHeight);
    $(".mediaLightbox").css('top', $(document).scrollTop() + 'px');

    mediaPath = apiMediaRoot + "api/media/render?user_id="+ globalID + "&auth_token=" + globalAuth + "&media_id="+ mediaID ;

    //window.open(mediaPath, '_blank');

    // Type 1 = video
    if (mediaType == "1") {
        $(".mediaLightboxContent").html("<div class='mediaLightboxHolder'><video width='100%' height='auto' controls autoplay autobuffer><source src="+mediaPath+" type='video/mp4'>Your browser does not support the video tag.</video></div>");
        $(".mediaLightbox").fadeIn();
        $(".mediaLightBoxBG").fadeIn();
    }

    // Type 2 = photo
    if (mediaType == "2") {
        $(".mediaLightboxContent").html("<div class='mediaLightboxHolder'><img src='"+mediaPath +"' width='100%' height='auto' class='img-responsive'  /></div>");
        $(".mediaLightbox").fadeIn();
        $(".mediaLightBoxBG").fadeIn();
    }
}

$('.socialComment').focus(function() {
 $(this).val('');
});

function closeShareOverlay() {
    $(".videoOverlay").fadeOut();
    $(".mediaLightBoxBG").fadeOut();
}

function shareToVimeo() {
    ga('send', 'event', 'Share to Vimeo', 'Clicked');
}

function shareToYoutube(mediaID) {

    ga('send', 'event', 'Share to Youtube', 'Clicked');
    
    closeShareOverlay() ;

    socialComment = $("#comment" + mediaID).val();

    var userPostArray = {
        user_id :  globalID,
        auth_token : globalAuth,
        media_id: mediaID,
        post_message: socialComment
    };

    $.post(apiRoot + "api/social/youtube/share",  userPostArray, function( data ) {
       getMedia();
   });
}

function shareToTwitter(mediaID) {

    ga('send', 'event', 'Share to Twitter', 'Clicked');
    
    closeShareOverlay() ;

    socialComment = $("#comment" + mediaID).val();

    var userPostArray = {
        user_id :  globalID,
        auth_token : globalAuth,
        media_id: mediaID,
        post_message: socialComment
    };

    $.post(apiRoot + "api/social/twitter/share",  userPostArray, function( data ) {
       getMedia();
   });
}

function shareToFacebook(mediaID) {

    ga('send', 'event', 'Share to Facebook', 'Clicked');

    closeShareOverlay() ;

    socialComment = $("#comment" + mediaID).val();

    var userPostArray = {
        user_id :  globalID,
        auth_token : globalAuth,
        media_id: mediaID,
        post_message: socialComment
    };

    $.post(apiRoot + "api/social/facebook/share",  userPostArray, function( data ) {
       getMedia();
   });

}

function setSocialNetwork() {

    // Set which social media options are available

    verifyUser();

    socialState = [];
    
    var userPostArray = {
        user_id :  globalID,
        auth_token : globalAuth
    };

    // Check if local storage value exists

    if (window.permissions == undefined) {
        $.post( apiRoot + "api/user/networks", userPostArray, function( data ) {

            $(".socialPermissions").html("");

            socialActive = false;

            socialNos = data.data;

            connected = new Array();
            permissions = new Array();
            networks = new Array();

            $.each(socialNos, function(n, soc) {

                $("#socialContent").append("<div class='socialHolder'><h2>"+socialNos[n].name+"</h2><div class='socialIcon "+ socialNos[n].name+ "'></div><div class='socialRight"+n+"'></div></div>");

                if (socialNos[n].connected && socialNos[n].permissions) {
                   socialState.push(true);
               } else
               {   
                socialState.push(false);
            }
                // Store items in local storage (using local storage to avoid bandwidth usage of cookies)

                connected.push(socialNos[n].connected);
                permissions.push(socialNos[n].permissions);
                networks.push(n);

                // localStorage.setItem("Connected"+ n, socialNos[n].connected);
                // localStorage.setItem("Permissions"+ n, socialNos[n].permissions);
                // localStorage.setItem("networks", n);

                if (socialNos[n].connected) {socialActive = true;}

                if (socialNos[n].connected && socialNos[n].permissions){ 
                    socialStatus = "Connected : ";
                    butttonState = "disconnect";
                } 

            });

if (!socialActive && $('.mainContentArea .socialNetworks').length < 1) {
    $(".mainContentArea").append("<div class='socialNetworks'><div class='socialMessage'>You have not yet connected any social media networks. To do this, please <a href=javascript:loadStatic('connections')>click here</a>.</div></div>");
}

}).fail(function() {
       // $(".socialIntro").html(loginError);

       if (!appBrowser) {
        $("#content").html(showLogin());
    }
    else {
        $("#content").html("<div class='appBrowseError'>Your session has expired, please restart sharing from the APP.</div>");

    }
});
}
else {
    // If social lookups have been completed this session look in local storage..

    currentSocialArray = ["Facebook", "YouTube", "Twitter", "Vimeo"];

    for (i = 0; i < networks.length ; i++) { 

        $("#socialContent").append("<div class='socialHolder'><h2>"+currentSocialArray[i]+"</h2><div class='socialIcon "+ currentSocialArray[i]+ "'></div><div class='socialRight"+i+"'></div></div>");

        if (JSON.parse(connected[i]) && JSON.parse(permissions[i])) {
           socialState.push(true);
       } else
       {   
        socialState.push(false);
    }

    if (JSON.parse(connected[i])) {socialActive = true;}

    if (JSON.parse(connected[i]) && JSON.parse(permissions[i])){ 
        socialStatus = "Connected : ";
        butttonState = "disconnect";
    } 

}

if (!socialActive && $('.mainContentArea .socialNetworks').length < 1) {
    $(".mainContentArea").append("<div class='socialNetworks'><div class='socialMessage'>You have not yet connected any social media networks. To do this, please <a href=javascript:loadStatic('connections')>click here</a>.</div></div>");
}
}
}



// trigger media enhance overlay

function makeEnhanceOverlay(mediaID, Type){
    $(".videoOverlay").html("");
    $(".videoOverlay").css({height: "272px"});
    $(".videoOverlay").append("<div class='overylayCloseHolder'><a href='javascript:closeShareOverlay()' class='close' ></a></div>");
    $(".overylayCloseHolder").prepend("<a href='javascript:saveNewTitle("+mediaID+")' class='closeAndSave'>Save & Close</a>");
    //$(".videoOverlay").append("<div class='overlayTitle'>"+$("#m"+mediaID +" .mediaTitle").html() + "</div>");
    $(".videoOverlay").append("<input class='form-control emailField changeTitleInput' type='text' name='email' id='email"+mediaID+"' value='"+$("#m"+mediaID +" .mediaTitle").html()+"' maxlength='33'/>");
    $(".videoOverlay").append("<div class='overlayThumb'><img src="+extractUrl($("#m"+mediaID +" .mediaThumbnail").css('background-image'))+ " width='220px' height='124px' /></div>");

    // If Video
    if (Type == 1) {
        $(".videoOverlay").append("<div class='stabiliseButton'><a href='javascript:enhanceMedia("+mediaID+",2)'><button type='submit' class='btn btn-zano fullwidthbutton' >STABILISE</button></a></div>");
        $(".videoOverlay").append("<div class='enhanceButton'><a href='javascript:enhanceMedia("+mediaID+",3)'><button type='submit' class='btn btn-zano fullwidthbutton' >GREYSCALE</button></a></div>");
    }

    // If Photo
    if (Type == 2) {
        $(".videoOverlay").append("<div class='redEyeButton'><a href='javascript:enhanceMedia("+mediaID+",4)'><button type='submit' class='btn btn-zano fullwidthbutton' >COLOUR ENHANCE</button></a></div>");
        $(".videoOverlay").append("<div class='enhanceButton'><a href='javascript:enhanceMedia("+mediaID+",6)'><button type='submit' class='btn btn-zano fullwidthbutton' >GREYSCALE</button></a></div>");
    }
    $(".videoOverlay").append("<div class='deleteButton'><a href='javascript:deleteVideo("+mediaID+")'><button type='submit' class='btn btn-zano fullwidthbutton' >DELETE</button></a></div>");

    $(function() {
    $(".changeTitleInput").keydown('change', function(){
        $(".closeAndSave").fadeIn();
    });
    });


   

    return true;
}

// trigger share overlay

function makeShareOverlay(mediaID, mediaType){
    $(".videoOverlay").html("");
    $(".videoOverlay").css({height: "256px"});
    $(".videoOverlay").append("<a href='javascript:closeShareOverlay()' class='close' ></a>");
    $(".videoOverlay").append("<div class='overlayTitle'>"+$("#m"+mediaID +" .mediaTitle").html() + "</div>");
    $(".videoOverlay").append("<div class='overlayThumb'><img src="+extractUrl($("#m"+mediaID +" .mediaThumbnail").css('background-image'))+ " width='220px' height='124px' /></div>");
    $(".videoOverlay").append("<div class='overlayInput'><textarea class='socialComment' id='comment"+ mediaID +"' rows='3' placeholder='Enter a message (optional) and click on an icon below...'></textarea></div>");
    $(".videoOverlay").append("<div class='overlayIcons'></div>");


    if (socialState[0]) {
       $(".videoOverlay .overlayIcons").append("<a href='javascript:shareToFacebook("+mediaID+")' class='shareFacebook'></a>");
   } else
   {
    $(".videoOverlay .overlayIcons").append("<a href=javascript:loadStatic('connections') class='connectFacebook'></a>");
}

if (mediaType == 2){
    if (socialState[1]) {
        $(".videoOverlay .overlayIcons").append("<a href='javascript:shareToTwitter("+mediaID+")' class='shareTwitter'></a>");
    } else
    {
        $(".videoOverlay .overlayIcons").append("<a href=javascript:loadStatic('connections') class='connectTwitter'></a>");
    }
}

if (mediaType == 1){
    if (socialState[2]) {
        $(".videoOverlay .overlayIcons").append("<a href='javascript:shareToYoutube("+mediaID+")' class='shareYouTube'></a>");
    } else
    {
       $(".videoOverlay .overlayIcons").append("<a href=javascript:loadStatic('connections') class='connectYouTube'></a>");
    }
}

if (mediaType == 1){
    if (socialState[3]) {
        //$(".videoOverlay .overlayIcons").append("<a href='javascript:shareToVimeo("+mediaID+")' class='shareVimeo'></a>");
    } else
    {
        //$(".videoOverlay .overlayIcons").append("<a href=javascript:loadStatic('connections') class='connectVimeo'></a>");
    }
}

return true;
}

function deleteVideo(mediaID) {
    $(".deleteButton").html("<div class='deleteText'>Are you sure?</div><a href='javascript:deleteVideoConfirm("+mediaID+")'><button type='submit' class='btn btn-zano halfwidthbutton' >YES</button></a><a href='javascript:deleteVideoClose()'><button type='submit' class='btn btn-zano halfwidthbutton' >NO</button></a>");
}

function deleteVideoClose(mediaID) {
    $(".deleteButton").html("<a href='javascript:deleteVideo("+mediaID+")'><button type='submit' class='btn btn-zano fullwidthbutton' >DELETE</button></a></div>");
}

function deleteVideoConfirm(mediaID) {

    var userPostArray = {
        user_id :  globalID,
        auth_token : globalAuth,
        media_id: mediaID
    };

    $.post( apiRoot + "api/media/remove", userPostArray, function( data ) {
        closeShareOverlay();
        getMedia() ;

    }).fail(function() {
        $(".deleteButton").html("<div class='deleteText'>There was an error deleting your media.</div>");
    });

}

// set media to be enhanced

function enhanceMedia(mediaID, filterID) {

    var userPostArray = {
        user_id :  globalID,
        auth_token : globalAuth,
        media_id: mediaID,
        filter_id: filterID
    };

    $.post( apiRoot + "api/media/process", userPostArray, function( data ) {
        closeShareOverlay();
        getMedia() ;

    }).fail(function() {

        if (filterID == 2) {
            $(".stabiliseButton").html("<div class='enhanceError'>There was an error,<br> please try again.</div>").delay(2500).fadeOut(200, function() {
                $(".stabiliseButton").html("<a href='javascript:enhanceMedia("+mediaID+",2)'><button type='submit' class='btn btn-zano fullwidthbutton' >STABILISE</button></a>").fadeIn(200);
            });       
        }

        if (filterID == 3) {
            $(".enhanceButton").html("<div class='enhanceError'>There was an error,<br> please try again.</div>").delay(2500).fadeOut(200, function() {
                $(".enhanceButton").html("<a href='javascript:enhanceMedia("+mediaID+",3)'><button type='submit' class='btn btn-zano fullwidthbutton' >GREYSCALE</button></a>").fadeIn(200);
            });  
        }

        if (filterID == 4) {
            $(".redEyeButton").html("<div class='enhanceError'>There was an error,<br> please try again.</div>").delay(2500).fadeOut(200, function() {
                $(".redEyeButton").html("<a href='javascript:enhanceMedia("+mediaID+",4)'><button type='submit' class='btn btn-zano fullwidthbutton' >RED EYE REDUCTION</button></a>").fadeIn(200);
            });  
        }

        if (filterID == 6) {
            $(".redEyeButton").html("<div class='enhanceError'>There was an error,<br> please try again.</div>").delay(2500).fadeOut(200, function() {
                $(".redEyeButton").html("<a href='javascript:enhanceMedia("+mediaID+",6)'><button type='submit' class='btn btn-zano fullwidthbutton' >GREYSCALE</button></a>").fadeIn(200);
            });  
        }
    });

}


var getIndexIfObjWithAttr = function(array, attr, value) {
    for(var i = 0; i < array.length; i++) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

function killTheInterval(mediaID){

    killArray = mediaArray.multiIndexOf(mediaID);

    var killArrayLength = killArray.length;

    for (var i = 0; i < killArrayLength; i++) {
        clearInterval(intervalArray[killArray[i]]);
    }

}

function pollProcessing(passedID, intervalTitle) {

    console.log("adding media: " + passedID)

    if (mediaArray.multiIndexOf(passedID) == ""){

        mediaArray.push(passedID);
       
        interval = setInterval(function() {

            $.getJSON("http://account.flyzano.com/api/media/detail", { user_id: globalID, auth_token: globalAuth, media_parent_id: passedID } , function(data) {

            var mediaContent = data.data.media;


               if (mediaContent[0].media_state.processing == 0 && mediaContent[0].media_state.sharable == 1 ){

                killTheInterval(mediaContent[0].media_id)

                if (viewState == "children") {


                     $("#m"+ mediaContent[0].media_id).html("");

                     $("#m"+ mediaContent[0].media_id).append("<div class='mediaTitle'>"+mediaContent[0].media_title + "</div>");


                    if (areEnhancments && mediaContent[0].media_state.processing == 0 && mediaContent[0].media_state.sharable == 1) {
                        $("#m"+ mediaContent[0].media_id).prepend("<div class='mediaEnhancements' style='top: 20px'></div>");
                    }
                    
                    if (mediaContent[0].media_state.col) {
                        $("#m"+ mediaContent[0].media_id + ' .mediaEnhancements').prepend("<div class='colour' title='Greyscale Applied'>G</div>");
                    }

                    if (mediaContent[0].media_state.red) {
                        $("#m"+ mediaContent[0].media_id + ' .mediaEnhancements').prepend("<div class='redEye' title='Colour Correction Applied'>C</div>");
                    }

                    if (mediaContent[0].media_state.stab) {
                        $("#m"+ mediaContent[0].media_id + ' .mediaEnhancements').prepend("<div class='stablise' title='Video has been stablised'>S</div>");
                    }

                    if (mediaContent[0].media_state.shared_facebook) {
                        $("#m"+ mediaContent[0].media_id + ' .mediaEnhancements').prepend("<div class='facebookShared' title='Shared on Facebook'></div>");
                    }

                    if (mediaContent[0].media_state.shared_twitter) {
                        $("#m"+ mediaContent[0].media_id + ' .mediaEnhancements').prepend("<div class='twitterShared' title='Shared on Twitter'></div>");
                    }

                    mediaPath = apiMediaRoot + "api/media/render?user_id="+ parseInt(globalID) + "&auth_token=" + globalAuth + "&media_id="+ mediaContent[0].media_id;


                    if (mediaContent[0].media_type == "video") {mediaType = 1;}
                    if (mediaContent[0].media_type == "photo") {mediaType = 2;}


                    $("#m"+ mediaContent[0].media_id ).append("<div class='mediaType'>"+ mediaIcon +"</div>");

                    if (mediaContent[0].media_state.processing == 0 && mediaContent[0].media_state.sharable == 1) {
                        $("#m"+ mediaContent[0].media_id ).append("<div class='mediaFunctions'><a class='download' href="+  mediaPath + "&download=1+" +"></a><a class='share' href=javascript:initiateOverlay(" + "'share'&#44;'" + mediaContent[0].media_id + "'&#44;'" + mediaType + "')></a><a class='enhance' href=javascript:initiateOverlay(" + "'enhance'&#44;'" + mediaContent[0].media_id + "'&#44;'" + mediaType + "')></a></div>");
                       // $("#m"+ mediaContent[i].media_id ).append("<a class='mediaThumbnail' href='javascript:showMediaLightbox("+ mediaType +"&#44;"+ mediaContent[i].media_id  + " )' style='background:url(" +  mediaPath + "&thumb=1); background-size:100% 100%' width='100%'' height='100%' /> </a>");
                       $("#m"+ mediaContent[0].media_id ).append("<div class='mediaViewMore eyeFader"+ mediaContent[0].media_id +"'  onmouseout='fadeEyeOut("+mediaContent[0].media_id+")'  onclick='doubleclick(this, "+mediaType+","+mediaContent[0].media_id+")'></div>");
                       $("#m"+ mediaContent[0].media_id ).append("<div class='mediaThumbnail' onclick='doubleclick(this, "+mediaType+","+mediaContent[0].media_id+")' onmouseover='fadeEyeIn("+mediaContent[0].media_id+")' style='background:url(" +  mediaPath + "&thumb=1); background-size:100% 100%' width='100%'' height='100%' ><div class='selectThis'><a href='javascript:addThisID("+mediaContent[0].media_id+")'><img src='//account.flyzano.com/images/mediaUnchecked.png' /></a></div></div>");

                    } else {

                        $("#m"+ mediaContent[0].media_id ).append("<a class='mediaThumbnail' style='background:url(" +  mediaPath + "&thumb=1) #000000;  opacity: 0.3; background-size:100% 100%' width='100%'' height='100%' /><div class='processing'>PROCESSING</div></a>");
                    }

                    } else {

                        $(".processing").remove()

                         mediaPath = apiMediaRoot + "api/media/render?user_id="+ parseInt(globalID) + "&auth_token=" + globalAuth + "&media_id="+ mediaContent[0].media_id;

                        $("#m"+ mediaContent[0].media_id ).append("<div class='mediaThumbnail' onclick='doubleclick(this, "+mediaType+","+mediaContent[0].media_id+")' onmouseover='fadeEyeIn("+mediaContent[0].media_id+")' style='background:url(" +  mediaPath + "&thumb=1); background-size:100% 100%' width='100%'' height='100%' ><div class='selectThis'><a href='javascript:addThisID("+mediaContent[0].media_id+")'><img src='//account.flyzano.com/images/mediaUnchecked.png' /></a></div></div>");

                    }

                }


        }).fail(function() {

      });
         }, 2000); //time in milliseconds 

    }


        if (intervalArray.multiIndexOf(interval) == "") {
                intervalArray.push(interval)
        }
        
         

        }
 

//clearInterval(startCheckingNetworks);


// re-load media with parent ID

function showParentVideos(parentID) {

    viewState = "children"

    $("#content").html("Loading...");

    setSocialNetwork();

    var rawIDs = [];
    var mediaIDs = [];

    verifyUser();

    var userPostArray = {
        user_id :  globalID,
        auth_token : globalAuth,
        media_parent_id: parentID
    };

    // Load the JSON content using passed in media type variable

    $.post(apiRoot + "api/media/parent",  userPostArray, function( data ) {
       $("#content").html("");
       //$("#content").html("<p>Psst, if you double click on videos you'll see a preview</p>");
       $("#content").html("<br><br>");
       var mediaData = data.data;

            // Start each
            $.each(mediaData, function(i, value){

                var mediaContent = mediaData.media;

                $.each(mediaContent, function(i, value){

                    mediaIDs.push(mediaContent[i].media_id);

                    if (mediaContent[i].media_state.processing != 0 || mediaContent[i].media_state.sharable != 1 ){

                        pollProcessing(mediaContent[i].media_id, mediaContent[i].media_title);

                    }

                    // Does the media have any media enhancements             

                    if (mediaContent[i].media_state.col || mediaContent[i].media_state.stab  || mediaContent[i].media_state.shared_facebook || mediaContent[i].media_state.shared_twitter || mediaContent[i].media_state.red) {areEnhancments = true;} else {areEnhancments = false;}

                    // Read media type

                    if (mediaContent[i].media_type == "photo"){ mediaIcon = "P";} else { mediaIcon = "V";} 

                    // If the media ID (parent video) hasnt been shown before show this video

                    if (mediaContent[i].media_state.processing == 0 && mediaContent[i].media_state.sharable == 1) {
                        $("#content").append("<div class='mediaRepeater selectable' id=m"+ mediaContent[i].media_id+ "><div class='mediaTitle'>"+mediaContent[i].media_title + "</div>");
                    } else {
                        $("#content").append("<div class='mediaRepeater selectable' id=m"+ mediaContent[i].media_id+ "><div class='mediaTitleProcessing'>"+mediaContent[i].media_title + "</div>");
                    }


                    if (areEnhancments && mediaContent[i].media_state.processing == 0 && mediaContent[i].media_state.sharable == 1) {
                        $("#m"+ mediaContent[i].media_id).prepend("<div class='mediaEnhancements' style='top: 20px'></div>");
                    }
                    
                    if (mediaContent[i].media_state.col) {
                        $("#m"+ mediaContent[i].media_id + ' .mediaEnhancements').prepend("<div class='colour' title='Greyscale Applied'>G</div>");
                    }

                    if (mediaContent[i].media_state.red) {
                        $("#m"+ mediaContent[i].media_id + ' .mediaEnhancements').prepend("<div class='redEye' title='Colour Correction Applied'>C</div>");
                    }

                    if (mediaContent[i].media_state.stab) {
                        $("#m"+ mediaContent[i].media_id + ' .mediaEnhancements').prepend("<div class='stablise' title='Video has been stablised'>S</div>");
                    }

                    if (mediaContent[i].media_state.shared_facebook) {
                        $("#m"+ mediaContent[i].media_id + ' .mediaEnhancements').prepend("<div class='facebookShared' title='Shared on Facebook'></div>");
                    }

                    if (mediaContent[i].media_state.shared_twitter) {
                        $("#m"+ mediaContent[i].media_id + ' .mediaEnhancements').prepend("<div class='twitterShared' title='Shared on Twitter'></div>");
                    }

                    mediaPath = apiMediaRoot + "api/media/render?user_id="+ parseInt(globalID) + "&auth_token=" + globalAuth + "&media_id="+ mediaContent[i].media_id;


                    if (mediaContent[i].media_type == "video") {mediaType = 1;}
                    if (mediaContent[i].media_type == "photo") {mediaType = 2;}


                    $("#m"+ mediaContent[i].media_id ).append("<div class='mediaType'>"+ mediaIcon +"</div>");

  if (mediaContent[i].media_state.processing == 0 && mediaContent[i].media_state.sharable == 1) {
                        $("#m"+ mediaContent[i].media_id ).append("<div class='mediaFunctions'><a class='download' href="+  mediaPath + "&download=1+" +"></a><a class='share' href=javascript:initiateOverlay(" + "'share'&#44;'" + mediaContent[i].media_id + "'&#44;'" + mediaType + "')></a><a class='enhance' href=javascript:initiateOverlay(" + "'enhance'&#44;'" + mediaContent[i].media_id + "'&#44;'" + mediaType + "')></a></div>");
                       // $("#m"+ mediaContent[i].media_id ).append("<a class='mediaThumbnail' href='javascript:showMediaLightbox("+ mediaType +"&#44;"+ mediaContent[i].media_id  + " )' style='background:url(" +  mediaPath + "&thumb=1); background-size:100% 100%' width='100%'' height='100%' /> </a>");
                       $("#m"+ mediaContent[i].media_id ).append("<div class='mediaViewMore eyeFader"+ mediaContent[i].media_id +"'  onmouseout='fadeEyeOut("+mediaContent[i].media_id+")'  onclick='doubleclick(this, "+mediaType+","+mediaContent[i].media_id+")'></div>");
                       $("#m"+ mediaContent[i].media_id ).append("<div class='mediaThumbnail' onclick='doubleclick(this, "+mediaType+","+mediaContent[i].media_id+")' onmouseover='fadeEyeIn("+mediaContent[i].media_id+")' style='background:url(" +  mediaPath + "&thumb=1); background-size:100% 100%' width='100%'' height='100%' ><div class='selectThis'><a href='javascript:addThisID("+mediaContent[i].media_id+")'><img src='//account.flyzano.com/images/mediaUnchecked.png' /></a></div></div>");

                    } else {

                        $("#m"+ mediaContent[i].media_id ).append("<a class='mediaThumbnail' style='background:url(" +  mediaPath + "&thumb=1) #000000;  opacity: 0.3; background-size:100% 100%' width='100%'' height='100%' /><div class='processing'>PROCESSING</div></a>");
                    }

                     // Add the parent ID to the array

                     rawIDs.push(mediaContent[i].media_parent_id);

                     // Check if the parent video has been shown before

                 });

        }); // End each 

$("#content").append("<div class='backButton'><button type='submit' class='btn btn-zano' onclick='getMedia()'>BACK TO ALL</button></div>");

});

}

// close lightbox on dark bg click

$(".mediaLightBoxBG").click(function() {
    closeShareOverlay();
    closeLighbox();
});


function fadeEyeIn(picID){
    $(".eyeFader" + picID).fadeIn();
     $(this).css('cursor','pointer');
}

function fadeEyeOut(picID){
    $(".eyeFader" + picID).fadeOut();
    $(this).css('cursor','auto');
}
function fadeShowallIn(picID){
    $(".stackFader" + picID).fadeIn();
     $(this).css('cursor','pointer');
}

function fadeShowallOut(picID){
    $(".stackFader" + picID).fadeOut();
    $(this).css('cursor','auto');
}



function getMedia() {

    viewState = "parents"

    storedIDs = [];

    enableOnclick = true;

     $(".deleteMany").html("<a href='javascript:deleteMany()'><img src='images/deleteMany.png' height='32px' width='32px'></a>");

// Set up arrays

$("#content").html("Loading...");

setSocialNetwork();

var rawIDs = [];
var mediaIDs = [];
var parentIDs = [];


verifyUser();

var userPostArray = {
    user_id :  globalID,
    auth_token : globalAuth
};

$.post(apiRoot + 'api/media/' +  mediatype, userPostArray, function( data ) {


         //$.post('allmedia.json', userPostArray, function( data ) {

            $("#content").html("<br><br>");

            //if (mediatype == "videos" || mediatype =="all") {$("#content").html("<p>Psst, if you double click on videos you'll see a preview</p>");}

            var  mediaData = data.data;

            if (mediaData.media === null || mediaData.media.length === 0) { $("#content").html("You currently have no media to show");}

            if ($.type(mediaData.media) == "object") {

                 if (mediaData.media.media_state.processing != 0 || mediaData.media.media_state.sharable != 1){

                    pollProcessing(mediaData.media.media_id, mediaData.media.media_title)


                    }

                    // Does the media have any media enhancements

                    if ( mediaData.media.media_state.col ||  mediaData.media.media_state.stab  ||  mediaData.media.media_state.shared_facebook || mediaData.media.media_state.shared_twitter ||  mediaData.media.media_state.red) {areEnhancments = true;} else {areEnhancments = false;}

                    // Read media type

                    if (mediaData.media.media_type == "photo"){ mediaIcon = "P";} else { mediaIcon = "V";} 

                    // If the media ID (parent video) hasnt been shown before show this video

                    if (rawIDs.count(mediaData.media.media_parent_id) < 1) {


                        if (mediaData.media.media_state.processing == 0 && mediaData.media.media_state.sharable == 1) {
                            $("#content").append("<div class='mediaRepeater selectable' id=m"+ mediaData.media.media_id+ "><div class='mediaTitle'>"+mediaData.media.media_title + "</div>");
                        } else {
                            $("#content").append("<div class='mediaRepeater selectable' id=m"+ mediaData.media.media_id+ "><div class='mediaTitleProcessing'>"+mediaData.media.media_title + "</div>");
                        }

                        if (areEnhancments && mediaData.media.media_state.processing == 0 && mediaData.media.media_state.sharable == 1) {
                            $("#m"+ mediaData.media.media_id).prepend("<div class='mediaEnhancements' style='top: 20px'></div>");
                        }

                        if (mediaData.media.media_state.col) {
                            $("#m"+ mediaData.media.media_id + ' .mediaEnhancements').prepend("<div class='colour' title='Colour correction applied'>C</div>");
                        }
                        
                        if (mediaData.media.media_state.red) {
                            $("#m"+ mediaData.media.media_id + ' .mediaEnhancements').prepend("<div class='redEye' title='Greyscale Applied'>G</div>");
                        }
                        
                        if (mediaData.media.media_state.stab) {
                            $("#m"+ mediaData.media.media_id + ' .mediaEnhancements').prepend("<div class='stablise' title='Video has been stablised'>S</div>");
                        }

                        if (mediaData.media.media_state.shared_facebook) {
                            $("#m"+ mediaData.media.media_id + ' .mediaEnhancements').prepend("<div class='facebookShared' title='Shared on Facebook'></div>");
                        }

                        if (mediaData.media.media_state.shared_twitter) {
                            $("#m"+ mediaData.media.media_id + ' .mediaEnhancements').prepend("<div class='twitterShared' title='Shared on Twitter'></div>");
                        }

                        mediaPath = apiMediaRoot + "api/media/render?user_id="+ parseInt(globalID) + "&auth_token=" + globalAuth + "&media_id="+ mediaData.media.media_id;



                        if (mediaData.media.media_type == "video") {mediaType = 1;}
                        if (mediaData.media.media_type == "photo") {mediaType = 2;}

                        $("#m"+ mediaData.media.media_id ).append("<div class='mediaType'>"+ mediaIcon +"</div>");

                        if (mediaData.media.media_state.processing == 0 && mediaData.media.media_state.sharable == 1) {
                            $("#m"+ mediaData.media.media_id ).append("<div class='mediaFunctions'><a class='download' href="+  mediaPath + "&download=1+" +"></a><a class='share' href=javascript:initiateOverlay(" + "'share'&#44;'" + String(mediaData.media.media_id) + "'&#44;'" + mediaType + "')></a><a class='enhance' href=javascript:initiateOverlay(" + "'enhance'&#44;'" + String(mediaData.media.media_id) + "'&#44;'" + mediaType + "')></a></div>");
                        //$("#m"+ mediaData.media.media_id ).append("<a class='mediaThumbnail' href='javascript:showMediaLightbox("+ mediaType +"&#44;"+ mediaData.media.media_id  + " )' style='background:url(" +  mediaPath + "&thumb=1); background-size:100% 100%' width='100%'' height='100%' /> </a>");
                        $("#m"+ mediaData.media.media_id ).append("<div class='mediaViewMore eyeFader"+ mediaData.media.media_id +"'  onmouseout='fadeEyeOut("+mediaData.media.media_id+")'></div> onclick='doubleclick(this, "+mediaType+","+mediaData.media.media_id+")'");
                       $("#m"+ mediaData.media.media_id ).append("<div class='mediaThumbnail' onclick='doubleclick(this, "+mediaType+","+mediaData.media.media_id+")' onmouseover='fadeEyeIn("+mediaData.media.media_id+")'  style='background:url(" +  mediaPath + "&thumb=1); background-size:100% 100%' width='100%'' height='100%' ><div class='selectThis'><a href='javascript:addThisID("+mediaData.media.media_id+")'><img src='//account.flyzano.com/images/mediaUnchecked.png' /></a></div></div>");


                    } else {

                        $("#m"+ mediaData.media.media_id ).append("<a class='mediaThumbnail' style='background:url(" +  mediaPath + "&thumb=1); opacity: 0.3; background-size:100% 100%' width='100%'' height='100%' /> <div class='processing'>PROCESSING</div></a>");
                    }
                }
            }
            else {

            // Start each
            $.each(mediaData, function(i, value){

                var mediaContent = mediaData.media;


                $.each(mediaContent, function(i, value){


                 mediaIDs.push(mediaContent[i].media_id);
                 parentIDs.push(mediaContent[i].media_parent_id);

                  if (mediaContent[i].media_state.processing != 0 || mediaContent[i].media_state.sharable != 1 ){

                        pollProcessing(mediaContent[i].media_id, mediaContent[i].media_title )
                    }


                 if (mediaContent[i].media_state.col || mediaContent[i].media_state.stab || mediaContent[i].media_state.shared_facebook  || mediaContent[i].media_state.shared_twitter || mediaContent[i].media_state.red) {areEnhancments = true;} else {areEnhancments = false;}

                    // Read media type

                    if (mediaContent[i].media_type == "photo"){ mediaIcon = "P";} else { mediaIcon = "V";} 

                    // If the media ID (parent video) hasnt been shown before show this video

                   

                    if (rawIDs.count(mediaContent[i].media_parent_id) < 1) {

                        if (mediaContent[i].media_state.processing == 0 && mediaContent[i].media_state.sharable == 1) {
                            $("#content").append("<div class='mediaRepeater selectable' id=m"+ mediaContent[i].media_id+ "><div class='mediaTitle'>"+mediaContent[i].media_title + "</div>");
                        } else {
                            $("#content").append("<div class='mediaRepeater selectable' id=m"+ mediaContent[i].media_id+ "><div class='mediaTitleProcessing'>"+mediaContent[i].media_title + "</div>");
                        }

                        if (areEnhancments && mediaContent[i].media_state.processing == 0 && mediaContent[i].media_state.sharable == 1) {
                           $("#m"+ mediaContent[i].media_id).prepend("<div class='mediaEnhancements' style='top: 20px'></div>");
                       }

                       if (mediaContent[i].media_state.col) {
                           $("#m"+ mediaContent[i].media_id  + ' .mediaEnhancements').prepend("<div class='colour' title='Colour correction applied'>C</div>");
                       }

                       if (mediaContent[i].media_state.red) {
                           $("#m"+ mediaContent[i].media_id + ' .mediaEnhancements').prepend("<div class='redEye' title='Greyscale Applied applied'>G</div>");
                       }

                       if (mediaContent[i].media_state.stab) {
                           $("#m"+ mediaContent[i].media_id + ' .mediaEnhancements').prepend("<div class='stablise' title='Video has been stablised'>S</div>");
                       }

                       if (mediaContent[i].media_state.shared_facebook) {
                        $("#m"+ mediaContent[i].media_id + ' .mediaEnhancements').prepend("<div class='facebookShared' title='Shared on Facebook'></div>");
                    }

                    if (mediaContent[i].media_state.shared_twitter) {
                        $("#m"+ mediaContent[i].media_id + ' .mediaEnhancements').prepend("<div class='twitterShared' title='Shared on Twitter'></div>");
                    }

                    mediaPath = apiMediaRoot + "api/media/render?user_id="+ parseInt(globalID) + "&auth_token=" + globalAuth + "&media_id="+ mediaContent[i].media_id;

                    if (mediaContent[i].media_type == "video") {mediaType = 1;}
                    if (mediaContent[i].media_type == "photo") {mediaType = 2;}

                    $("#m"+ mediaContent[i].media_id ).append("<div class='mediaType'>"+ mediaIcon +"</div>");

                    if (mediaContent[i].media_state.processing == 0 && mediaContent[i].media_state.sharable == 1) {
                        $("#m"+ mediaContent[i].media_id ).append("<div class='mediaFunctions'><a class='download' href="+  mediaPath + "&download=1+" +"></a><a class='share' href=javascript:initiateOverlay(" + "'share'&#44;'" + mediaContent[i].media_id + "'&#44;'" + mediaType + "')></a><a class='enhance' href=javascript:initiateOverlay(" + "'enhance'&#44;'" + mediaContent[i].media_id + "'&#44;'" + mediaType + "')></a></div>");
                       // $("#m"+ mediaContent[i].media_id ).append("<a class='mediaThumbnail' href='javascript:showMediaLightbox("+ mediaType +"&#44;"+ mediaContent[i].media_id  + " )' style='background:url(" +  mediaPath + "&thumb=1); background-size:100% 100%' width='100%'' height='100%' /> </a>");
                       $("#m"+ mediaContent[i].media_id ).append("<div class='mediaViewMore eyeFader"+ mediaContent[i].media_id +"'  onmouseout='fadeEyeOut("+mediaContent[i].media_id+")'  onclick='doubleclick(this, "+mediaType+","+mediaContent[i].media_id+")'></div>");
                       $("#m"+ mediaContent[i].media_id ).append("<div class='mediaThumbnail' onclick='doubleclick(this, "+mediaType+","+mediaContent[i].media_id+")' onmouseover='fadeEyeIn("+mediaContent[i].media_id+")' style='background:url(" +  mediaPath + "&thumb=1); background-size:100% 100%' width='100%'' height='100%' ><div class='selectThis'><a href='javascript:addThisID("+mediaContent[i].media_id+")'><img src='//account.flyzano.com/images/mediaUnchecked.png' /></a></div></div>");

                   } else {
                    $("#m"+ mediaContent[i].media_id ).append("<div class='mediaFunctions'></div>");
                    $("#m"+ mediaContent[i].media_id ).append("<a class='mediaThumbnail' style='background:url(" +  mediaPath + "&thumb=1);  opacity: 0.3; background-size:100% 100%' width='100%'' height='100%' /><div class='processing'>PROCESSING</div></a>");
                }

            }
                     // Add the parent ID to the array

                     rawIDs.push(mediaContent[i].media_parent_id);

                     // Check if the parent video has been shown before

                     if (rawIDs.count(mediaContent[i].media_parent_id) > 1) {

                        // If it has, add 1 to the stack count

                        if ($('#p'+mediaContent[i].media_parent_id).length){

                            $('#p'+mediaContent[i].media_parent_id).html(parseInt($('#p'+mediaContent[i].media_parent_id).html())+1);

                        }
                        else {

                        // If it hasnt add the stack graphic

                        previousValue = mediaIDs[(parentIDs.indexOf(mediaContent[i].media_parent_id))];

                        $("#m"+ previousValue ).append("<a class='mediaMultiples' onmouseover='fadeShowallIn("+mediaContent[i].media_id+")'  onmouseout='fadeShowallOut("+mediaContent[i].media_id+")' href='javascript:showParentVideos("+mediaContent[i].media_parent_id+")'><div class='mediaMultipleCount' id=p"+mediaContent[i].media_parent_id+">"+ rawIDs.count(mediaContent[i].media_parent_id) +"</div></a></div>");
                        $("#m"+ previousValue + " .mediaEnhancements").hide();
                        $("#m"+ previousValue + " .mediaType").css({ left: 6  });

                        $("#m"+ previousValue ).append("<div class='mediaViewStack stackFader"+ mediaContent[i].media_id +"'   href='javascript:showParentVideos("+mediaContent[i].media_parent_id+")'></div>");

                        $("#m"+ previousValue + " .mediaFunctions").html("");
                        $("#m"+ previousValue).addClass("stackedMedia");
                        $("#m"+ previousValue).removeClass("selectable");
                        $("#m"+ previousValue + " .selectThis").html("");


                    }
                } 
            });
        }); // End each 

}

}).fail(function() {
    if (!appBrowser) {
        $("#content").html(loginError);
    }
    else {
        $("#content").html("<div class='appBrowseError'>Your session has expired, please restart sharing from the APP.</div>");

    }
});
}

$("body").nodoubletapzoom();
getMedia();