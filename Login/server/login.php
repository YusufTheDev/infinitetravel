<?php

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

    //login the user
    $_SESSION["userName"] = $row["userName"];
    $_SESSION["bestScore"] = $row["bestScore"];
    $_SESSION["gold"] = $row["gold"];
    echo("true");
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
