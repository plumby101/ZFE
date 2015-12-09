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

function backToAccount(){

  loadStatic("home")

}

function contactSubmit() {

    var submitErrors = true;

    if ($("#comments").val() == "") {
      $("#validationComments").html(" - Please enter an explanation.");
      submitErrors = false;
    }
    else 
      { $("#validationComments").html("");
    }


   if (submitErrors){

   var dataString = 'account_id='+ globalID + 'account_type='+ globalID +'&comment='+ $("#comments").val() + '&url='+ $("#url").val()


         $.post("includes/send_mail_account.php", dataString, function (response) {
        
        if (response == 1) {
              $(".register").html("<h1>Thank you</h1><h2>Your entry has been sent.</h2>We will endevour to reply within 72 hours.<br><br><button class='btn btn-zano' onClick='backToAccount()'>ACCOUNT HOME</button>");
               ga('send', 'event', 'Application Type Change', 'Clicked');
            } else {

              $(".formSubmitError").html("<br><br>There was an error submitting your entry, please check the details and try again.")
            }

    }).fail(function() {
         $(".formSubmitError").html("<br><br>There was an error submitting your entry, please check the details and try again.")
    });

  }
}

$(document).ready(function() {
  accountType = window.location.hash.substring(1);
   $(".applictionType").html(accountType)
   $(".account_id").val(globalID)
 });
