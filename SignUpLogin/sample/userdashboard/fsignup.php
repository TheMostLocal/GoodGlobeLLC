<?php
function mail_veri($data) 
  {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }

  //-----------signout-----------
  if (isset($_GET['hello'])) 
{
  
  sout();
}
function sout()
{
  session_start();
  session_destroy();
  $_SESSION = array();
  header('Location:8080/WEB/signuplogin/sample/login_page_html/sample.php');
}
//----------------------login pass email id ---------------
function eid($email)
{
  return $email;
}
function pid($password)
{
  return $password;
}

  ?>