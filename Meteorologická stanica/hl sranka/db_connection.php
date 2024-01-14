<?php
function OpenCon()
{
	$con= mysqli_connect("fdb32.awardspace.net", "4405582_mpmeteo",
                     "qwertzuiop123", "4405582_mpmeteo", "3306");
	return $con;
 }
 
function CloseCon($con)
{
	$con -> close();
}
   
?>