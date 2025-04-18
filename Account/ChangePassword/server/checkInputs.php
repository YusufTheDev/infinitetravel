<?php

/**
 * check if the old password is correct.
 * @param string $oldPassword the old password to check
 * @return bool true if the old password is correct, false otherwise
 */
function checkOldPassword($oldPassword)
{
    //connect to the database
    include "../../../Connect/connectServer.php";

    //prepare the command
    $command = "SELECT * FROM userInformation WHERE userName = ? ";
    $stmt = $dbh->prepare($command);
    //execute the command
    $args = [$_SESSION["userName"]];
    $success = $stmt->execute($args);

    //check if success
    if ($success) {
        //fetch the data
        $row = $stmt->fetch();
        //check if the old password is correct
        if (password_verify($oldPassword, $row["password"])) {
            return true;
        }
        return false;
    } else {
        echo ("Fail to execute the command.");
        die();
    }
}

//start session
session_start();

// get the parameter
$oldPassword = filter_input(INPUT_GET, "oldPassword", FILTER_SANITIZE_SPECIAL_CHARS);
$password = filter_input(INPUT_GET, "password", FILTER_SANITIZE_SPECIAL_CHARS);
$confirmPassword = filter_input(INPUT_GET, "confirmPassword", FILTER_SANITIZE_SPECIAL_CHARS);


//check if the username is empty
if (empty($oldPassword)) {
    echo ("OldPassword cannot be empty.");
}
//check if the password is empty
elseif (empty($password)) {
    echo ("Password cannot be empty.");
}
//check if the confirm password is empty
elseif (empty($confirmPassword)) {
    echo ("Confirm password cannot be empty.");
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
elseif (!checkOldPassword($oldPassword)) {
    echo ("Old password wrong.");
}
//check if the new password is the same as the old password
elseif($oldPassword === $password) {
    echo ("New password cannot be the same as old password.");
}

//pass
else {
    echo ("true");
}
