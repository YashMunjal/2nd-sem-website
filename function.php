<?php
global $conn;
$config = array(

	'username' => 'root',
	'password' => 'anmol',
	'database' => 'login'
);

function connect($config)
{
	try {
		$conn = new PDO('mysql:host=localhost;dbname='.$config['database'],
						$config['username'],
						$config['password']);

		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		return $conn;
		
} catch(Exception $e) {
		//return false;
		echo $e;
}
}
function query($query, $bindings, $conn)
{
	$stmt = $conn->prepare($query);
	$stmt->execute($bindings);
}