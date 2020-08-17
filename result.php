<?php
require 'function.php';
$conn=connect($config);
if(!$conn){die('could not connect');}
?>

<?php
$data=array();


if(isset($_POST['add']))
{
	if($_SERVER['REQUEST_METHOD']=='POST')
	{
		$name=$_POST['name'];
		$pass=$_POST['pass'];
		$confpass=$_POST['confpass'];
		$email=$_POST['email'];
	}
	query(
		"INSERT INTO login(username,password,confirm,email) VALUES (:name,:pass,:confpass,:email);", 
		array(
			'name'=>$name,
			'pass'=>$pass,
			'confpass'=>$confpass,
			'email'=>$email
			),
		$conn);
		header("Location: http://localhost/site/progressbar.html");
		exit();
}

if(isset($_POST['update']))
{
	if($_SERVER['REQUEST_METHOD']=='POST')
	{
		$email=$_POST['email'];
		$pass=$_POST['pass'];
	}
	query(
		"UPDATE login SET password=:pass,confirm=:pass WHERE email=:email;", 
		array(
			'email'=>$email,
			'pass'=>$pass,
			'confpass'=>$pass
			),
		$conn);
		header("Location: http://localhost/site/login%20page.html");
		exit();
}

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
             	header("Location: http://localhost/site/progressbar.html");
				exit();
            }
            else{
            	header("Location: http://localhost/site/login%20page.html");
               }
        }
    }
}

if(isset($_POST['delete']))
{
	query(
		"DELETE FROM inst WHERE name=:name AND course=:course ;", 
		array(
			'name'=>$name,
			'course'=>$course
			),
		$conn);
	echo "Record Deleted";
}
if(isset($_POST['view']))
{
	$result=$conn->query('SELECT * FROM inst');
		foreach($result as $row){
			print_r($row['Name']);	
			echo "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
			print_r($row['Course']);
			echo "<br>";
		}
}