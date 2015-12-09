<!DOCTYPE html>
<html lang="en-US">
<head>
    <title>ZANO - CAPTURING LIFE</title>
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,700' rel='stylesheet' type='text/css'>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="css/custombootstrap.css" rel="stylesheet">
    <link href="css/custom.css" rel="stylesheet">
    <link href="css/lightbox.css" rel="stylesheet" />

</head>

<body>


<?php include "includes/topnav.php";?>


<div class="mainContent">
  <div class="mobileMenuFader"></div>
  <div class="container contactholder">
    <div class="col-sm-12 col-md-offset-3 col-md-6 login register">
      <h1>Contact Us</h1>
      <div class="loginMessage">If you have any questions or comments, please get in touch by submitting this form.<br><br></div>
      <div class="form-group"> 
        <label for="first_name"><span class="disabledText">First Name*</span><b><span id="validationTextFN" class="invalidText"></span></b></label>
        <input class="form-control" type="text" name="first_name" id="first_name" value=""/>
      </div>
      <div class="form-group"> 
        <label for="last_name"><span class="disabledText">Last Name*</span><b><span id="validationTextLN" class="invalidText"></span></b></label>
        <input class="form-control" type="text" name="last_name" id="last_name" value=""/>
      </div>
      <div class="form-group"> 
        <label for="email"><span class="disabledText">Email address*</span><b><span id="validationTextEM" class="invalidText"></span></b></label>
        <input class="form-control" type="text" name="email" id="email" value=""/>
      </div>
      <div class="form-group"> 
        <label for="telephone"><span class="disabledText">Phone Number</span><b><span id="validationTextPhone" class="invalidText"></span></b></label>
        <input class="form-control" type="text" name="telephone" id="telephone" value=""/>
      </div>

      <div class="form-group"> 
        <label for="comments"><span class="disabledText">Enquiry*</span><b><span id="validationComments" class="invalidText"></span></b></label>
        <textarea class="form-control" rows="5" name="comments" id="comments"></textarea>
      </div>browse
      <p class="antispam">Website URL <input type="text" name="url" id="url" /></p>
      <button type="submit" class="btn btn-zano" onClick='contactSubmit()'> Submit</button>
      <div class="formSubmitError"></div>
    </div>
  </div>
</div>



 <script src="js/jquery-1.11.2.min.js"></script>
<script src="js/global.min.js"></script>
<?php include "includes/footer.php";?>
<script>


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


function contactSubmit() {

    var submitErrors = true;

    if ($("#first_name").val() == "") {
      $("#validationTextFN").html(" - Please enter a first name");
      submitErrors = false;
    }
    else 
      { $("#validationTextFN").html("");
    }

    if ($("#last_name").val() == "") {
      $("#validationTextLN").html(" - Please enter a last name");
       submitErrors = false;
    }
    else 
      { $("#validationTextLN").html("");
    }

    if ($("#comments").val() == "") {
      $("#validationComments").html(" - Please enter a comment");
      submitErrors = false;
    }
    else 
      { $("#validationComments").html("");
    }

     if (validateEmail($("#email").val()) == "") {
      $("#validationTextEM").html(" - Please enter an email address");
      submitErrors = false;
    }
    else 
      { $("#validationTextEM").html("");
    }

 
   if (submitErrors){

   var dataString = 'first_name='+ $("#first_name").val() + '&last_name='+ $("#last_name").val() + '&email='+ $("#email").val() + '&telephone='+ $("#telephone").val() + '&comment='+ $("#comments").val() + '&url='+ $("#url").val()

        
 
      

         $.post("includes/send_mail.php", dataString, function (response) {
        
        if (response == 1) {
              $(".register").html("<h1>Contact Us</h1><h2>Thank you. Your entry has been sent.</h2><br><br>We will endevour to reply within 72 hours.");
               ga('send', 'event', 'Contact Form', 'Clicked');
            } else {

              $(".formSubmitError").html("<br><br>There was an error submitting your entry, please check the details and try again.")
            }

    }).fail(function() {
         $(".formSubmitError").html("<br><br>There was an error submitting your entry, please check the details and try again.")
    });

       }

	
}
</script>
</body>