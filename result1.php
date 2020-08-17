<?php
require 'function.php';
$conn=connect($config);
if(!$conn){die('could not connect');}


if(isset($_POST['filter'])){

	if($_SERVER['REQUEST_METHOD']=='POST')
	{
		$email=$_POST['email'];
		$pass=$_POST['pass'];
	}
    
   $result=$conn->query('SELECT * FROM login ');
    if($result->rowCount() > 0){
        while($row = $result->fetch()){
			  if($email==$row['email'] && $pass==$row['password']){
             	header("Location: http://localhost/site/loading.html");
				exit();
            }
            else{
            	header("Location: http://localhost/site/login%20page.html");
               }
        }
    }
}
?>
