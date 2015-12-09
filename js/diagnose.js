function firstRow(purchasedMethod){

  if (purchasedMethod == 1) {
    $(".row1 .ks").addClass("disabled")
    $(".row1 .ks").addClass("selected")
    $(".row1 .fz").addClass("disabled")
    $(".row1 .or").addClass("disabled")

    $(".row1 .questionText").addClass("disabledQuestion")

    $(".row2 .questionText").html("Please enter your Kickstarter backer ID and ZANO serial number")

    $(".row2").fadeIn()
    $(".row6").fadeIn()

    purcahaseMethod = "Kickstarter"

  }

  if (purchasedMethod == 2) {
    $(".row1 .ks").addClass("disabled")
    $(".row1 .fz").addClass("disabled")
    $(".row1 .fz").addClass("selected")
    $(".row1 .or").addClass("disabled")

    $(".row1 .questionText").addClass("disabledQuestion")

    $(".row2 .questionText").html("Please enter your Flyzano.com Order ID and ZANO serial number")

    $(".row2").fadeIn()
    $(".row6").fadeIn()

    purcahaseMethod = "Flyzano.com"

  }

  if (purchasedMethod == 3) {
    $(".row1 .ks").addClass("disabled")
    $(".row1 .fz").addClass("disabled")
    $(".row1 .or").addClass("disabled")
    $(".row1 .or").addClass("selected")

    $(".row1 .questionText").addClass("disabledQuestion")

    $(".row2").html("Please return the product to the retailer from which you purchased it.<br><br> The retailer will be ready to help you solve the problem.")

    $(".row2").fadeIn()
    $(".row6").fadeIn()
  }

}

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

function submitAllReport(){

  proceed = true;

  if (!validateEmail($(".emailAddress").val())) {
    $("#validationEmail").html(" - Please enter a valid email address")
    proceed = false;
  }
  else {
    $("#validationEmail").html("")
  }

  if ($(".fullName").val() == "") {
    $("#validationName").html(" - Please enter a name")
    proceed = false;

   }
  else {
    $("#validationName").html("")
  }


  if ($(".phoneNumber").val() == "") {
    $("#validationPhone").html(" - Please enter a phone number")
    proceed = false;

  
   }
  else {
    $("#validationPhone").html("")
  }

  if (proceed == true){

  if ($(".zanoID").val() != undefined) {
    zanoSerial = $(".zanoID").val()
  } 
  else {

      zanoSerial = "ZANO serial N/A"
  }

  var messagebody = "method=" + purcahaseMethod  + "&order_id=" + $(".orderID").val() + "&problem_product=" + problemProduct + " / " + zanoSerial + "&explaination=" + $(".explanationTextarea").val() + "&full_name=" + $(".fullName").val() + "&email=" + $(".emailAddress").val() + "&telephone=" + $(".phoneNumber").val();


 $.post("//support.flyzano.com/includes/send_diagnose.php", messagebody, function (response) {
        
        if (response == 1) {
              $(".returnsArea").html("<h1>Returns & Shipping</h1>Thank you. Your entry has been sent.</h2><br><br>We have a standard response time of three working days.");
               ga('send', 'event', 'Retunrs form submitted', 'Clicked');
            } else {

              $(".formSubmitError").html("There was an error submitting your entry, please check the details and try again.<br>")
            }

    }).fail(function() {
          $(".formSubmitError").html("There was an error submitting your entry, please check the details and try again.<br>")
    });

       }

  


}

function resetForm() {
  window.location.href = "http://support.flyzano.com/returns-and-shipping/"
}

$(function() {
    $(".orderID").keydown('change', function(){
        $(".orderIDButton").fadeIn();
  });
});

$(function() {
    $(".zanoID").keydown('change', function(){
        $(".zanoIDButton").fadeIn();
  });
});


$(function() {
   $(".row2 .orderIDButton").click(function() {
      $(".row2 .orderID").addClass("disabled")
      $(".row2 .questionText").addClass("disabledQuestion")
      $(".orderIDButton").fadeOut()
      $(".row3").fadeIn()
  });
});

$(function() {
   $(".row3b .zanoIDButton").click(function() {
      $(".row3b .zanoID").addClass("disabled")
      $(".row3b .questionText").addClass("disabledQuestion")
      $(".zanoIDButton").fadeOut()
      $(".row4").fadeIn()
      $(".row4 .questionText").html("Please describe in detail the issue with your ZANO.")
  });
});


$(function() {
   $(".row4 .explanationButton").click(function() {
      $(".row4 .explanationTextarea").addClass("disabled")
      $(".row4 .questionText").addClass("disabledQuestion")
      $(".explanationButton").fadeOut()
      $(".row5").fadeIn()
  });
});




function thirdRow(productType){

  if (productType == 1) {
      $(".row3 .zano").addClass("disabled")
      $(".row3 .access").addClass("disabled")
      $(".row3 .access").addClass("selected")
      $(".row3 .questionText").addClass("disabledQuestion")

      $(".row4 .questionText").html("Please describe in detail the issue with your accessory.")
      $(".row3b").remove()
      $(".row4").fadeIn()

      problemProduct = "Accessory"
  }

   if (productType == 2) {
    $(".row3 .access").addClass("disabled")
    $(".row3 .zano").addClass("disabled")
    $(".row3 .zano").addClass("selected")

    $(".row3 .questionText").addClass("disabledQuestion")

    $(".row3b").fadeIn()

    problemProduct = "ZANO"
  }

}


$(function() {
    $(".explanationTextarea").keydown('change', function(){
        $(".explanationButton").fadeIn();
  });
});

