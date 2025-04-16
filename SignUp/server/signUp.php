<?php


/**
 * sign up a user.
 */
function signUp($dbh, $stmt, $userName, $password, $bestScore)
{

    //prepare the command
    $command = "INSERT INTO userInformation (userName, password,bestScore) VALUES (?, ?,?)";
    $stmt = $dbh->prepare($command);
    //execute the command
    $args = [$userName, $password, $bestScore];
    $success = $stmt->execute($args);

    //check if success
    if ($success) {
        $_SESSION["userName"] = $userName;
        echo ("Sign up successful. Username: " . $_SESSION["userName"]);
        //set the session variables
    } else {
        echo ("Sign up fail.");
    }
}

//start session
session_start();

//init variables
$bestScore = 0;

//get the parameter
$userName = filter_input(INPUT_GET, "userName", FILTER_SANITIZE_SPECIAL_CHARS);
$password = filter_input(INPUT_GET, "password", FILTER_SANITIZE_SPECIAL_CHARS);

//connect
include "../../Connect/connectServer.php";

//prepare
$command = "SELECT * FROM userInformation WHERE userName = ? ";
$stmt = $dbh->prepare($command);

//execute
$args = [$userName];
$success = $stmt->execute($args);

//check if success
if ($success) {
    signUp($dbh, $stmt, $userName, password_hash($password,PASSWORD_DEFAULT) , $bestScore);
} else {
    echo ("Fail to execute the command.");
    session_destroy();
}
