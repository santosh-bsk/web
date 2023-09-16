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
$get_email = ($data->email);

$result = mysqli_query($conn,"SELECT * FROM registered_work WHERE field_9 = '$get_email'");

if(mysqli_num_rows($result))
{
	$response["products"] = array();	

	while($AllProducts = mysqli_fetch_array($result))
	{
		// temp user array
		$products = array();
		$products = $AllProducts;
		array_push($response["products"],$products);
	}	
	$response["success"] = 1;
	echo json_encode($response);
	

}
else
{
	$response["success"] = 0;	
	echo json_encode($response);
}
	

?>