<?php

//start session
session_start();

//get the parameter
$password = filter_input(INPUT_GET, "password", FILTER_SANITIZE_SPECIAL_CHARS);

//connect
include "../../../Connect/connectServer.php";

//prepare
$command = "UPDATE userInformation SET password = ? WHERE userName = ? ";
$stmt = $dbh->prepare($command);

//execute
$args = [password_hash($password, PASSWORD_DEFAULT),$_SESSION["userName"]];
$success = $stmt->execute($args);

//check if success
if ($success) {
    $_SESSION["password"] = $password;
    echo ("Password changed successfully.");
} else {
    echo ("Fail to change password.");
    session_destroy();
}
