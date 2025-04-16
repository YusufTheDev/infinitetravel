<?php

/**
 * check if the username is already taken.
 * @param string $userName the username to check
 * @return bool true if the username is already taken, false otherwise
 */
function checkNameRedundancy($userName)
{
    //connect to the database
    include "../../Connect/connectServer.php";

    //prepare the command
    $command = "SELECT * FROM userInformation WHERE userName = ? ";
    $stmt = $dbh->prepare($command);
    //execute the command
    $args = [$userName];
    $success = $stmt->execute($args);

    //check if success
    if ($success) {
        //check if the user exists
        if ($stmt->rowCount() > 0) {
            return true;
        }
        return false;
    } else {
        echo ("Fail to execute the command.");
        die();
    }
}

// get the parameter
$userName = filter_input(INPUT_GET, "userName", FILTER_SANITIZE_SPECIAL_CHARS);
$password = filter_input(INPUT_GET, "password", FILTER_SANITIZE_SPECIAL_CHARS);
$confirmPassword = filter_input(INPUT_GET, "confirmPassword", FILTER_SANITIZE_SPECIAL_CHARS);


//check if the username is empty
if (empty($userName)) {
    echo ("Username cannot be empty.");
}
//check if the password is empty
elseif (empty($password)) {
    echo ("Password cannot be empty.");
}
//check if the confirm password is empty
elseif (empty($confirmPassword)) {
    echo ("Confirm password cannot be empty.");
}
//check the username
elseif (strlen($userName) > 15) {
    echo ("Username must be less than 15 characters long.");
}
//check if the username contasins special characters
elseif (preg_match('/[^a-zA-Z0-9]/', $userName)) {
    echo ("Username must only contain letters and numbers.");
}
//check the password length
elseif (strlen($password) < 6  || strlen($password) > 15) {
    echo ("Password must be between 6 and 15 characters long.");
}
//check if the password contains one uppercase letter
elseif (!preg_match('/[A-Z]/', $password)) {
    echo ("Password must contain at least one uppercase letter.");
}
//check if the password contains one lowercase letter
elseif (!preg_match('/[a-z]/', $password)) {
    echo ("Password must contain at least one lowercase letter.");
}
//check if the password contains one number
elseif (!preg_match('/[0-9]/', $password)) {
    echo ("Password must contain at least one number.");
}
//check if the password contains one special character
elseif (!preg_match('/[!@#$%^&*()_+\-=\[\]{};":\\|,.<>\/?]+/', $password)) {
    echo ("Password must contain at least one special character.");
}
//check if the password and confirm password match
elseif ($password !== $confirmPassword) {
    echo ("Password and confirm password do not match.");
}
//check if the username is already taken
elseif (checkNameRedundancy($userName)) {
    echo ("Username already exists.");
}
//pass
else {
    echo ("true");
}
