
<?php
/**
 * Author : Tony He 
 *Student Number: 400579318
 *Date: 2025/04/02
 *
 *This php file sign up the user by creating new row and a session.
 */

//start session
session_start();

//init variables
$bestScore = 0;

//get the parameter
$userName = filter_input(INPUT_GET, "userName", FILTER_SANITIZE_SPECIAL_CHARS);
$password = filter_input(INPUT_GET, "password", FILTER_SANITIZE_SPECIAL_CHARS);

//connect
include "../../Connect/connectServer.php";

//prepare the command
$command = "INSERT INTO userInformation (userName, password,bestScore) VALUES (?, ?,?)";
$stmt = $dbh->prepare($command);
//execute the command
$args = [$userName, password_hash($password, PASSWORD_DEFAULT), $bestScore];
$success = $stmt->execute($args);

//check if success
if ($success) {
    //prepare
    $command = "SELECT * FROM userInformation WHERE userName = ? ";
    $stmt = $dbh->prepare($command);

    //execute
    $args = [$userName];
    $success = $stmt->execute($args);

    //check if success
    if ($success) {
        $row = $stmt->fetch();

        //get all the data
        $data = ["userName", "bestScore", "gold", "speedBoost", "moreHp", "default", "golden", "exGolden", "promax", "mew", "what", "big", "skin"];
        foreach ($data as $i) {
            $_SESSION[$i] = $row[$i];
        }
        echo ("Sign up successful. Username: " . $_SESSION["userName"]);
    } else {
        echo ("Fail to get user.");
        session_destroy();
    }
} else {
    echo ("Sign up fail.");
    session_destroy();
}
