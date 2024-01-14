<?php

include 'db_connection.php';
$con= OpenCon();

$k = $_GET["key"];					 
$NAME = $_GET["NAME"];
$T = $_GET["T"];
$H = $_GET["H"]; 
$P = $_GET["P"];

if ($k =="MyCircuit2022")
{
	$sql ="INSERT INTO data (NAME,T,H,P) VALUES ('$NAME','$T','$H','$P')";
	mysqli_query($con, $sql); 
	
	echo "<br>Done!";
}

CloseCon($con);


?>

