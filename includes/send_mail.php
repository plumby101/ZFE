<?php

// Blank message to start with so we can append to it.
$message = '';

// Check that name & email aren't empty.


if ($_POST['url'] != "") { 
	die('0');
}

// Construct the message
$message .= <<<TEXT
    Fist Name: {$_POST['first_name']}
    Last Name: {$_POST['last_name']}
    Email: {$_POST['email']}
    Telephone: {$_POST['telephone']}
    Message: {$_POST['comment']}    
    {$checkString}
TEXT;

// Email to send to
$to = 'communications@torquinggroup.com';

// Email Subject
$subject = 'You have been contacted!';

// Name to show email from
$from = 'Support Website';

// Domain to show the email from
$fromEmail = 'communications@torquinggroup.com';

// Construct a header to send who the email is from
$header = 'From: ' . $from . '<' . $fromEmail . '>';

// Try sending the email
if(!mail($to, $subject, $message, $header)){
    die('0');
}else{
    die('1');
}

?>