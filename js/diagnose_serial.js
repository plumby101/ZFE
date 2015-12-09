function firstRow(purchasedMethod){

  if (purchasedMethod == 1) {
    $(".row1 .ks").addClass("disabled")
    $(".row1 .ks").addClass("selected")
    $(".row1 .fz").addClass("disabled")
    $(".row1 .or").addClass("disabled")

    $(".row1 .questionText").addClass("disabledQuestion")

    $(".row2 .orderType").html("Kickstarter")

    $(".row2").fadeIn()
    $(".row6").fadeIn()

    purcahaseMethod = "Kickstarter"

    if (problemType == "serial"){
      $(".serialChecker").attr("onclick","serialOrderCheck('KS')");
    } else {
      $(".serialChecker").attr("onclick","noSerialOrderCheck('KS')");
      $(".noZanoText2").html("Please enter your Kickstarter backer ID")
    };

    purchaseMethodShort = "KS"
    $('#zanoRefID').attr("placeholder", "Kickstarter backer ID")

    

  }

  if (purchasedMethod == 2) {
    $(".row1 .ks").addClass("disabled")
    $(".row1 .fz").addClass("disabled")
    $(".row1 .fz").addClass("selected")
    $(".row1 .or").addClass("disabled")

    $(".row1 .questionText").addClass("disabledQuestion")

    $(".row2 .orderType").html("pre-order")

    $(".row2").fadeIn()
    $(".row6").fadeIn()

    purcahaseMethod = "Flyzano.com"

    purchaseMethodShort = "PO"

    if (problemType == "serial"){
      $(".serialChecker").attr("onclick","serialOrderCheck('PO')");
    } else {
      $(".serialChecker").attr("onclick","noSerialOrderCheck('PO')");
       $(".noZanoText2").html("Please enter your flyzano.com order ID")
    };
    $('#zanoRefID').attr("placeholder", "Flyzano Order ID")

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

$(".problemDropdown").change(function () {

        if ($('.problemDropdown').val() == "0"){
            $("#validationTextDD").html("Please choose an issue.")
        } else {
         $(".problemDropdown").prop("disabled", true);
            $(".row1").fadeIn()
            problemType = "serial"
        }

        if ($('.problemDropdown').val() == "4" || $('.problemDropdown').val() == "5"){
            problemType = "noSerial"
            $(".serialPart").remove()
        }

         if ($('.problemDropdown').val() == "5"){
            
            $(".noZanoText1").html("Where did you purchase your ZANO?")
            $(".productIssueType").html("Which product have you not received?")
        }

          if ($('.problemDropdown').val() == "4"){
            
            $(".productIssueType").html("Which product do you wish to change the details on?")
        }

        

        
});

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

function noSerialOrderCheck(orderType){


  $(".serialChecker").remove()
  $("#zanoSerialNumber").prop("disabled", true);
  $("#zanoRefID").prop("disabled", true);

  $(".row3").fadeIn();

}

function serialOrderCheck(orderOrigin){



   var jsonBuild = {
    device_sn_start: $("#zanoSerialNumber").val(),
    order_ref: $("#zanoRefID").val(),
    order_type: orderOrigin
  };



    $.post("/api/zanos/ordervalidate", jsonBuild , function (response) {
        
      $(".row3").fadeIn();
      $(".serialChecker").remove()
      $("#zanoSerialNumber").prop("disabled", true);
      $("#zanoRefID").prop("disabled", true);
      $("#validationTextSerialJoin").html("<br><br>")

    }).fail(function() {
          $("#validationTextSerialJoin").html("<br>There was an error submitting your entry, please check the details and try again.<br>")
    });

       }

function thirdRow(productType){

    $(".row4").fadeIn();

    if (productType == "2") {

        problemProduct = "ZANO"
        $(".row4 .question4Holder").html("Please expand on your query regarding the ZANO")
        $(".row3 .zano").addClass("selected")
        $(".row3 .access").addClass("disabled")

    } else{

        problemProduct = "Accessory"
        $(".row4 .question4Holder").html("Please expand on your query regarding the accessory")
        $(".row3 .zano").addClass("selected")
        $(".row3 .access").addClass("disabled")
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

  if ($("#zanoSerialNumber").val() != undefined) {
    zanoSerial = $("#zanoSerialNumber").val()
  } 
  else {

      zanoSerial = ""
  }

 // var messagebody = "method=" + purcahaseMethod  + "&order_id=" + $(".orderID").val() + "&problem_product=" + problemProduct + " / " + zanoSerial + "&explaination=" + $(".explanationTextarea").val() + "&full_name=" + $(".fullName").val() + "&email=" + $(".emailAddress").val() + "&telephone=" + $(".phoneNumber").val();


  var jsonBuild = {
    issue_type: $('.problemDropdown').val(),
    device_sn_start: zanoSerial,
    order_type: purchaseMethodShort,
    order_ref: $("#zanoRefID").val(),
    problem_type: problemProduct,
    description: $(".explanationTextarea").val(),
    email: $(".emailAddress").val(),
    phone: $(".phoneNumber").val(),
    name: $(".fullName").val()
  };


    $.post("http://support.flyzano.com/api/zanos/submitissue", jsonBuild, function (response) {

        $(".returnsArea").html("<h1>Returns & Shipping</h1>Thank you. Your entry has been sent.</h2><br><br>We have a standard response time of three working days.");
        ga('send', 'event', 'Retunrs form submitted', 'Clicked');
       
    }).fail(function() {
     
        $(".formSubmitError").html("There was an error submitting your entry, please check the details and try again.<br>");

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
      $(".row2 .questionText").addClass("disabledQuestion");
      $(".orderIDButton").fadeOut();
      $(".row3").fadeIn();
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







$(function() {
    $(".explanationTextarea").keydown('change', function(){
        $(".explanationButton").fadeIn();
  });
});

