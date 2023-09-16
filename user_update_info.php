<?php
/*********************

**** CPanel ******************
*********/

/* Following code will match user login credentials */

// array for JSON response
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';

// connecting to db


$data = json_decode(file_get_contents("php://input"));

$get_email = ($data->email);
$get_admin_id = ($data->password);
$get_fname = ($data->name);
$get_mobile = ($data->mobile);
$get_aadhar = ($data->field_4);

if(empty($get_admin_id) || empty($get_fname) || empty($get_mobile)|| empty($get_aadhar))
{
	$response["success"] = 2;
	echo json_encode($response);
}
else
{
	// get customer 
	$result = mysqli_query($conn,"UPDATE login SET name='$get_fname', mobile='$get_mobile' , password='$get_admin_id', 
	field_4='$get_aadhar' 	WHERE email = '$get_email'");

	// check for empty result
	if($result)
	{
		// success
		$response["success"] = 1;
		
		// echoing JSON response
		echo json_encode($response);
	}
	else 
	{
		// unsuccess
		$response["success"] = 0;
		
		// echoing JSON response
		echo json_encode($response);
	}
}	
?>