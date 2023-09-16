var app = angular.module("myapp", ['ngCookies']);
app.controller("myappCtrl", function($scope, $cookies, $cookieStore, $http) 
{
	
/****************************************************************************/
/************************** Get Admin Details ***********************************/
/****************************************************************************/	
	$scope.cook_user_email = $cookieStore.get("cook_user_email");
	$scope.cook_work_email = $cookieStore.get("cook_work_email");
	$scope.cook_admin_email = $cookieStore.get("cook_admin_email");
	
	$scope.cook_type = $cookieStore.get("cook_type");
	/****************************************************************************/
/************************** User Logout ************************************/
/****************************************************************************/		
	$scope.user_logout = function() 
	{
		if(confirm("Are You Sure?"))
		{
			$cookies.cook_user_email = "";
			$cookies.cook_user_email = "";
			window.location = "index.html";
			return;
		}
		else
		{
			return false;
		}
	}
/****************************************************************************/
/************************** Worker Logout ************************************/
/****************************************************************************/		
	$scope.worker_logout = function() 
	{
		if(confirm("Are You Sure?"))
		{
			$cookies.cook_user_email = "";
			$cookies.cook_work_email = "";
			window.location = "index.html";
			return;
		}
		else
		{
			return false;
		}
	}
	/****************************************************************************/
/************************** Admin Logout ************************************/
/****************************************************************************/		
	$scope.admin_logout = function() 
	{
		if(confirm("Are You Sure?"))
		{
			$cookies.cook_admin_email = "";
			$cookies.cook_user_email = "";
			window.location = "index.html";
			return;
		}
		else
		{
			return false;
		}
	}
		/****************************************************************************/
/************************** Worker Login *************************************/
/****************************************************************************/
	// sign in button
	$scope.worker_login = function() 
	{		
        $http.post('worker_login.php', 
			{'email': $scope.email, 'password':$scope.password,'field_1':$scope.field_1})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Login Successful");
					window.location = "worker_home.html";
				$cookieStore.put("cook_work_email",data.email);
				
				$cookieStore.put("cook_type",data.field_1);
			  // Home Page
				return;				
			}
			else if(data.success == 2)
			{
				alert("Please Fill All Fields");
			}
			else
			{
				alert("Login Unsuccessful");
			}
        });
    }
	
	
/****************************************************************************/
/************************** Add Work *********************************/
/****************************************************************************/
	$scope.create_work = function() 
	{		
		$http.post('create_work.php', {
		'field_1':$scope.field_1,'field_2':$scope.field_2,'field_3':$scope.field_3,
		'field_4':$scope.field_4,'field_5':$scope.field_5,'field_6':$scope.field_6,
		'field_7':$scope.field_7,'field_8':$scope.field_8,'field_9':$scope.field_9,
		'email':$scope.cook_work_email,
		'field_10':$scope.cook_type
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Work Created Successfully");
				window.location = "worker_home.html";
				
				return;				
			}
			else if(data.success == 2)
			{
				alert("Please Fill All Fields");
			}
			else
			{
				alert("Un Successfully");
			}
        });
    }
		
	/****************************************************************************/
/************************** Feedback cookie *********************************/
/****************************************************************************/
	$scope.create_feedback = function(email) 
	{		
		window.location = "add_feedback.html";
		$cookieStore.put("cook_work_fd_email",email);
		return;				
    }
$scope.cook_work_fd_email = $cookieStore.get("cook_work_fd_email");


	/****************************************************************************/
/************************** Add Feedback*********************************/
/****************************************************************************/
	$scope.add_feedback = function() 
	{		
		$http.post('create_feedback.php', {
		'field_1':$scope.cook_work_fd_email,'email':$scope.cook_user_email,'field_2':$scope.field_2
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Feedback Created Successfully");
				window.location = "user_home.html";
				return;				
			}
			else if(data.success == 2)
			{
				alert("Please Fill All Fields");
			}
			else
			{
				alert("Un Successfully");
			}
        });
    }
/****************************************************************************/
/************************** admin Details *********************************/
/****************************************************************************/
	$http.post('worker_contact_get.php', {'email': $scope.cook_work_email})
	.success(function(data, status, headers, config) 
	{
		if(data.success == 1)
		{
			$scope.worker_details = data.details;
		}
		else
		{
			$scope.worker_details = "No Data Found !!!";
		}
    });
	/****************************************************************************/
/************************** Feedback view *********************************/
/****************************************************************************/
	$http.post('feedback_get.php', {'email': $scope.cook_work_email})
	.success(function(data, status, headers, config) 
	{
	
			if(data.success == 1)
		{
			$scope.feedback_details = data.details;
		}
		else
		{
			$scope.feedback_details = "No Data Found !!!";
		}
		
    });
	

	$scope.view_feedback = function(email) 
	{		
		window.location = "view_feedback_user.html";
		$cookieStore.put("cook_work_email",email);
		return;				
    }
$scope.cook_work_email = $cookieStore.get("cook_work_email");


	$http.post('get_user_feedback.php', {'email': $scope.cook_work_email})
	.success(function(data, status, headers, config) 
	{
			$scope.feedback_user_details = data.details;
    });
	
	$http.post('get_user_reg.php')
	.success(function(data, status, headers, config) 
	{
			$scope.reg_user_details = data.details;
    });
	
//****************************************************************************/
/************************** My Work details  *********************************/
/****************************************************************************/
	$http.post('my_work_get.php', {'email': $scope.cook_work_email})
	.success(function(data, status, headers, config) 
	{
		if(data.success == 1)
		{
			$scope.my_work_details = data.details;
		}
		else
		{
			$scope.my_work_details = "No Data Found !!!";
		}
    });
//****************************************************************************/
/************************** Get All details  *********************************/
/****************************************************************************/
	$http.post('all_work_get.php')
	.success(function(data, status, headers, config) 
	{
		if(data.success == 1)
		{
			$scope.user_work_details = data.details;
		}
		else
		{
			$scope.user_work_details = "No Data Found !!!";
		}
    });
	//****************************************************************************/
/************************** Get Contract details  *********************************/
/****************************************************************************/
	$http.post('contract_get.php')
	.success(function(data, status, headers, config) 
	{
		$scope.con_details = data.details;
    });
/****************************************************************************/
/************************** Get All details  *********************************/
/****************************************************************************/
	$http.post('work_get.php')
	.success(function(data, status, headers, config) 
	{
		if(data.success == 1)
		{
			$scope.work_details = data.details;
		}
		else
		{
			$scope.work_details = "No Data Found !!!";
		}
    });
	/****************************************************************************/
/************************** Get All User details  *********************************/
/****************************************************************************/
	$http.post('user_get_all.php')
	.success(function(data, status, headers, config) 
	{
		if(data.success == 1)
		{
			$scope.all_user_details = data.details;
		}
		else
		{
			$scope.all_user_details = "No Data Found !!!";
		}
    });
	
/****************************************************************************/
/************************** Post Query User *********************************/
/****************************************************************************/
	$scope.reg_work_cookie = function(cus_id) 
	{		
		window.location = "user_reg_work.html";
		$cookieStore.put("cook_reg_id",cus_id);
		return;				
    }
	$scope.cook_reg_id = $cookieStore.get("cook_reg_id");

/****************************************************************************/
/************************** Full View Work Details *********************************/
/****************************************************************************/
$scope.user_reg_work = function() 
	{		
	
	$http.post('full_view_work.php', 
	{'cus_id': $scope.cook_reg_id,'name':$scope.name,'mobile':$scope.mobile,
	'email': $scope.cook_user_email,'field_4': $scope.field_4 })
	.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Submited successfully");
				window.location = "my_register.html";
				return;				
			}
			else
			{
				alert("Submited successfully");
				window.location = "my_register.html";
				return;				
			}   
          });
     }
	 
	$http.post('my_reg_work.php', {'email': $scope.cook_user_email})
	.success(function(data, status, headers, config) 
	{
		$scope.full_work_details = data.details;
    });

	/****************************************************************************/
/************************** My Vi *********************************/
/****************************************************************************/
	$http.post('my_register.php', {'email': $scope.cook_user_email})
	.success(function(data, status, headers, config) 
	{
		if(data.success == 1)
		{
			$scope.my_reg_details = data.details;
		}
		else
		{
			$scope.my_reg_details = "No Data Found !!!";
		}
    });
	/****************************************************************************/
/************************** My Register Details *********************************/
/****************************************************************************/
	$http.post('my_register.php', {'email': $scope.cook_user_email})
	.success(function(data, status, headers, config) 
	{
		if(data.success == 1)
		{
			$scope.my_reg_details = data.details;
		}
		else
		{
			$scope.my_reg_details = "No Data Found !!!";
		}
    });
/****************************************************************************/
/************************** Worker Update *********************************/
/****************************************************************************/
$scope.update_work = function(cus_id,field_1,field_2,field_3,
								 field_4,field_5,field_6,field_7,field_8,field_11) 
	{
		window.location = "update_work.html";
		$cookieStore.put("cook_cus_id",cus_id);
		$cookieStore.put("cook_field_1",field_1);
		$cookieStore.put("cook_field_2",field_2);
		$cookieStore.put("cook_field_3",field_3);
		$cookieStore.put("cook_field_4",field_4);
		$cookieStore.put("cook_field_5",field_5);
		$cookieStore.put("cook_field_6",field_6);
		$cookieStore.put("cook_field_7",field_7);
		$cookieStore.put("cook_field_8",field_8);
		$cookieStore.put("cook_field_11",field_11);
		return;
	}	
	
	$scope.cook_cus_id = $cookieStore.get("cook_cus_id");
	$scope.cook_field_1 = $cookieStore.get("cook_field_1");
	$scope.cook_field_2 = $cookieStore.get("cook_field_2");
	$scope.cook_field_3 = $cookieStore.get("cook_field_3");
	$scope.cook_field_4 = $cookieStore.get("cook_field_4");
	$scope.cook_field_5 = $cookieStore.get("cook_field_5");
	$scope.cook_field_6 = $cookieStore.get("cook_field_6");
	$scope.cook_field_7 = $cookieStore.get("cook_field_7");
	$scope.cook_field_8 = $cookieStore.get("cook_field_8");
	$scope.cook_field_11 = $cookieStore.get("cook_field_11");

	$scope.save_work = function() 
	{		
		$http.post('save_work.php',{
		'id':$scope.cook_cus_id,'field_1':$scope.cook_field_1,'field_2':$scope.cook_field_2,
		'field_3':$scope.cook_field_3,'field_4':$scope.cook_field_4,'field_5':$scope.cook_field_5,'field_6':$scope.cook_field_6,'field_7':$scope.cook_field_7,'field_8':$scope.cook_field_8,'field_11':$scope.cook_field_11})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Submited successfully");
				window.location = "view_work.html";
				return;				
			}
			else
			{
				alert("Invalid Inputs");
			}   
          });
     }
/****************************************************************************/
/************************** Worker Contact Update *********************************/
/****************************************************************************/
	
$scope.worker_update_info = function(name,password,mobile) 
	{
		window.location = "worker_info_edit.html";
		$cookieStore.put("cook_work_name",name);
		$cookieStore.put("cook_work_password",password);
		$cookieStore.put("cook_work_mobile",mobile);
		return;
	}	
	
	$scope.cook_work_name = $cookieStore.get("cook_work_name");
	$scope.cook_work_password = $cookieStore.get("cook_work_password");
	$scope.cook_work_mobile = $cookieStore.get("cook_work_mobile");

	$scope.save_update_info1 = function() 
	{		
		$http.post('worker_update_info.php',{
		 'name':$scope.cook_work_name, 'password':$scope.cook_work_password,
		 'mobile': $scope.cook_work_mobile, 'email': $scope.cook_work_email})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Submited successfully");
				window.location = "view_work_contact.html";
				return;				
			}
			else
			{
				alert("Invalid Inputs");
			}   
          });
     }
/****************************************************************************/
/************************** Worker Status Update *********************************/
/****************************************************************************/
	
$scope.update_status_work = function(cus_id,field_9) 
	{
		window.location = "worker_status_edit.html";
		$cookieStore.put("cook_work_id",cus_id);
		$cookieStore.put("cook_work_status",field_9);
		
		return;
	}	
	
	$scope.cook_work_id = $cookieStore.get("cook_work_id");
	$scope.cook_work_status = $cookieStore.get("cook_work_status");

	$scope.save_work_status = function() 
	{		
		$http.post('worker_update_status.php',{
		 'cus_id':$scope.cook_work_id, 'field_9':$scope.cook_work_status})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Submited successfully");
				window.location = "view_work_details.html";
				return;				
			}
			else
			{
				alert("Invalid Inputs");
			}   
          });
     }

	 /****************************************************************************/
/************************** Contract Status Update *********************************/
/****************************************************************************/
	
$scope.update_status_con = function(cus_id,field_9) 
	{
		window.location = "con_status_edit.html";
		$cookieStore.put("cook_con_id",cus_id);
		$cookieStore.put("cook_con_status",field_9);
		
		return;
	}	
	
	$scope.cook_con_id = $cookieStore.get("cook_con_id");
	$scope.cook_con_status = $cookieStore.get("cook_con_status");

	$scope.save_con_status = function() 
	{		
		$http.post('con_update_status.php',{
		 'cus_id':$scope.cook_con_id, 'field_9':$scope.cook_con_status})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Submited successfully");
				window.location = "view_con_details.html";
				return;				
			}
			else
			{
				alert("Invalid Inputs");
			}   
          });
     }

/****************************************************************************/
/************************** User Update *********************************/
/****************************************************************************/
	
		$http.post('get_user_info.php',	{
			'email':$scope.cook_user_email
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{			
				$scope.userdetails = data.details;
			}
          });
		  
$scope.user_update_info = function(name,password,mobile,field_4) 
	{
		window.location = "user_info_edit.html";
		$cookieStore.put("cook_name",name);
		$cookieStore.put("cook_password",password);
		$cookieStore.put("cook_mobile",mobile);
		$cookieStore.put("cook_aadhar",field_4);
		return;
	}	
	
	$scope.cook_name = $cookieStore.get("cook_name");
	$scope.cook_password = $cookieStore.get("cook_password");
	$scope.cook_mobile = $cookieStore.get("cook_mobile");
	$scope.cook_aadhar = $cookieStore.get("cook_aadhar");

	$scope.save_update_info = function() 
	{		
		$http.post('user_update_info.php',{
		 'name':$scope.cook_name, 'password':$scope.cook_password,
		 'mobile': $scope.cook_mobile, 'email': $scope.cook_user_email,
		 'field_4': $scope.cook_aadhar})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Submited successfully");
				window.location = "user_update_info.html";
				return;				
			}
			else
			{
				alert("Invalid Inputs");
			}   
          });
     }


	$scope.delete_work = function(cus_id) 
	{		
        $http.post('delete_work.php', 
		{
		'cus_id': cus_id
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Deleted Successful");
				window.location = "view_work.html";	
				return;
			}
			else if(data.success == 0)
			{
				alert("Error While Deleting Product!!");
			}
			else
			{
				alert("No id found");
			}
        });
    }
	
			


	
	
});