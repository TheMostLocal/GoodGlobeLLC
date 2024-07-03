‹?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
// Retrieve form data
$firstname = $_POST["firstname"];
$lastname = $_POST["lastname"];
$email = $_POST["email"];
$message = $_POST["message"];
// Display the submitted data echo "First Name:" . $firstname. "<br>"; "Last Name:" . $lastname. "<br>";echo "Email: " . $email . "<br>";
echo "Message: " . $message . "<br>";
?>
