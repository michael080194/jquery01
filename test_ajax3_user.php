<?php
$user =isset($_POST['user']) ? $_POST['user'] : '';
$email =isset($_POST['email']) ? $_POST['email'] : '';
$sex =isset($_POST['sex']) ? $_POST['sex'] : '';
echo $user."--".$email."--".$sex;
?>