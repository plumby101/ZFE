<?php

// Blank message to start with so we can append to it.
$message = '';

// Check that name & email aren't empty.


if ($_POST['url'] != "") { 
	die('0');
}

// Construct the message
$message .= <<<TEXT
    Account ID: {$_POST['account_id']}
    Message: {$_POST['comment']}    
    {$checkString}
TEXT;

// Email to send to
$to = 'communications@torquinggroup.com';

// Email Subject
$subject = 'Account type change request';

// Name to show email from
$from = 'My Account';

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