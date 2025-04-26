<?php
/**
 * Author : Tony He 
 * Student Number: 400579318
 * Date: 2025/04/02
 * This php file check if username and password are correct and log user in by creating session
 * 
 */


/**
 * sign up a user.
 * @param PDOStatement $stmt the statement to execute
 * @param string $password the password to sign up
 */
function login($stmt, $password)
{
    //check if the user exists
    if ($stmt->rowCount() == 0) {
        echo ("User does not exist or password is incorrect.");
        session_destroy();
        return;
    }

    //fetch the data
    $row = $stmt->fetch();
    //check if the password is correct
    if (!password_verify($password, $row["password"])) {
        echo ("User does not exist or password is incorrect.");
        session_destroy();
        return;
    }

    //get all the data
    $data = ["userName", "bestScore", "gold", "speedBoost", "moreHp", "default", "golden", "exGolden", "promax", "mew", "what", "big", "skin"];
    foreach($data as $i) {
        $_SESSION[$i] = $row[$i];
    }
    echo ("true");
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
    //check if the user exists
    login($stmt, $password);
} else {
    echo ("Fail to execute the command.");
    session_destroy();
}
