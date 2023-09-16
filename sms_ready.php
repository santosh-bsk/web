<?php


// array for JSON response
$response = array();

// check for post data

	$data = json_decode(file_get_contents("php://input"));
	$get_name = ($data->email);
	$get_mobile = ($data->mobile);
	
	// Authorisation details.
	$username = "contact@arudhrainnovations.com";
	$hash = "5a920f96a12b4702b59fe996787fe7d1f9a7c61c";
	// Config variables.
	$test = "0";

	$sender = "AISOFT"; // This is who the message appears to be from.
	$numbers =  $get_mobile; // A single number or a comma-seperated list of numbers
	
	$message = 'Dear '.$get_name.',
Your project is ready for delivery. Please visit branch. We look forward to a long and successful association Thank you for choosing Arudhra.';
	// 612 chars or less
	// A single number or a comma-seperated list of numbers
	$message = urlencode($message);
	$data = "username=".$username."&hash=".$hash."&message=".$message."&sender=".$sender."&numbers=".$numbers."&test=".$test;
	$ch = curl_init('http://api.textlocal.in/send/?');
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$result = curl_exec($ch); // This is the result from the API
	curl_close($ch);
	
	$response["success"] = 1;
	echo json_encode($response);

?>