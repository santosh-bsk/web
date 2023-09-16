<?php
/*********************
**** CPanel ******************
*********/

/* Following code will match admin login credentials */

//user temp array
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';

// connecting to db


$data = json_decode(file_get_contents("php://input"));
$get_id = ($data->cus_id);
$get_email = ($data->email);
$get_name = ($data->name);
$get_mobile= ($data->mobile);
$get_field_4 = ($data->field_4);

$result = mysqli_query($conn,"SELECT * FROM work_details WHERE cus_id = '$get_id'");

if(mysqli_num_rows($result))
{
	$response["products"] = array();	

	while($AllProducts = mysqli_fetch_array($result))
	{
		// temp user array
		$products = array();
		$products = $AllProducts;
		$id = $AllProducts["cus_id"];
		$email=$AllProducts["email"];
		$field_1=$AllProducts["field_1"];
		$field_2=$AllProducts["field_2"];
		$field_3=$AllProducts["field_3"];
		$field_4=$AllProducts["field_4"];
		$field_5=$AllProducts["field_5"];
		$field_6=$AllProducts["field_6"];
		$field_7=$AllProducts["field_7"];
		$field_8=$AllProducts["field_8"];
		$result2 = mysqli_query($conn,"INSERT INTO registered_work
		(email,field_1,field_2,field_3,field_4,field_5,field_6,field_7,
		field_8,field_9,field_10,field_11,field_12)
			VALUES('$email', '$field_1','$field_2','$field_3','$field_4','$field_5',
			'$field_6','$field_7','$field_8','$get_email','$get_name','$get_field_4',
			'$get_mobile')");
		array_push($response["products"],$products);

	$response["success"] = 1;
	echo json_encode($response);
		
		
	// Authorisation details.
	$username = "contact@arudhrainnovations.com";
	$hash = "5a920f96a12b4702b59fe996787fe7d1f9a7c61c";
	// Config variables.
	$test = "0"; // 1 - Developer mode 0-user mode
	$sender = "AISOFT"; // This is who the message appears to be from.
	$numbers =  $get_mobile; // A single number or a comma-seperated list of numbers
	$message = 'We look forward to a long and successful association. Thank you for Registering';
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

		
	}	
	

}
else
{
	$response["success"] = 0;	
	echo json_encode($response);
}
	

?>