<html>
	<center>
	<head>
		<title>Home</title>
	</head>
	<center>
<body>

<style>
	h1 {
 		border:5px solid;
  		border-block-start-style: groove
  		border-color: coral;
	}
	body {
		border: 8px groove rgb(0, 0, 0);
	}

</style>


<img src= "https://cdn.vectorstock.com/i/500p/80/80/lawn-mower-man-gardener-cartoon-vector-1068080.avif" width="180" height="205"/>
<img src= "https://st.depositphotos.com/1743476/2446/i/450/depositphotos_24461927-stock-photo-portrait-of-happy-businesspeople.jpg" width="300" height="200"/>
<img src= "https://media.istockphoto.com/id/1373430803/vector/home-renovation-workers-repairman-team-building-house-painting-electric-finishing-works.jpg?s=612x612&w=0&k=20&c=67KJTPd_hNTLZKzKyCwNcT1YjQFmsoRiwKXKk34hDw0=" width="250" height="200"/>
<img src= "https://img.freepik.com/free-photo/low-angle-architects-shaking-hands_23-2148269341.jpg?w=1480&t=st=1717466478~exp=1717467078~hmac=d650e280454e1aedb7abfb7d33a8c6160022398002d03cedb821101a7ae3a8c9" width="280" height="200" />

<h1>Welcome to the GoodGlobe!</h1>
<center><h5>ADMIN PLEASE ENTER USERNAME AND PASSWORD</h5></center>

<center>
<div style="background-color:rgb(187, 0, 0) ; inline-size: 500px;">
	<div>

	<form action="#" method="POST">
	<br>
		<label>username</label>
		<input type="text" name="username" required>
	</div>
	<br>
	<div>
		<label>password</label>
		<input type="text" name="password" required>
	</div>
	<br>
	<div>
		<input type="submit" value="Login">
	</div>
	</form>
	<br>
</div>
</center>

<center><h5>CUSTOMERS PLEASE ENTER PHONE NUMBER TO VIEW RESERVATIONS</h5></center>
<center>
<div style="background-color:rgb(187, 0, 0) ; inline-size: 500px;">
	<div>

	<form action="#" method="POST">
	<br>
	<div>
		<label>phone number</label>
		<input type="text" name="phoneNumber" required>
	</div>
	<br>
	<div>
		<input type="submit" value="Login">
	</div>
	</form>
	<br>
</div>
</center>
</body>
</html>




<!-- <?php
	
	error_reporting(E_ERROR | E_PARSE);
	$conn = new mysqli('localhost', 'root', 'mysql', 'project');

	if($_POST['username'] && $_POST['password']){
	
		$username=$_POST["username"];
		$password=$_POST["password"];
		
		$sql="select * from admin where AdminName= '".$username."' AND admin_pw= '".$password."';";
		
		$result=mysqli_query($conn,$sql);
		$row=mysqli_fetch_array($result);

		if($row[0]!= NULL){
			header("location:adminhome.php");
		} else {

			echo "<p style='color:red;'>Incorrect username or password.</p>";
		}
	}



	if($_POST['phoneNumber']){
	
		$phoneNumber=$_POST["phoneNumber"];

		session_start(); // session start
		include("global.php");
		$_SESSION['cell']=$phoneNumber;

		
		$sql="select * from customer where cell_num='".$phoneNumber."' ;";
		$result=mysqli_query($conn,$sql);
		$row=mysqli_fetch_array($result);

		if($row!=NULL){
			header("location:userhome.php");
		} else {
			$sql = "insert into customer(cell_num) values ('".$phoneNumber."');";
			$result = mysqli_query($conn, $sql);
			header("location:userhome.php");
		}
	}
?>

 -->