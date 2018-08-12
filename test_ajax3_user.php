<?php
$user  = isset($_POST['user']) ? $_POST['user'] : '';
$email = isset($_POST['email']) ? $_POST['email'] : '';
$sex   = isset($_POST['sex']) ? $_POST['sex'] : '';

$j = 10; // 100000000; test for time out or loading
for ($i = 1; $i <= $j; $i++) {

}

echo $user . "--" . $email . "--" . $sex;
