<?php



// get the parameter
$userName = filter_input(INPUT_GET, "userName", FILTER_SANITIZE_SPECIAL_CHARS);
$password = filter_input(INPUT_GET, "password", FILTER_SANITIZE_SPECIAL_CHARS);


//check if the username is empty
if (empty($userName)) {
    echo ("Username cannot be empty.");
}
//check if the password is empty
elseif (empty($password)) {
    echo ("Password cannot be empty.");
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
//pass
else {
    echo ("true");
}

