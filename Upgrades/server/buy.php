<?php

function updateSkin($skinName,$args)
{
    //connect to the database
    include "../../Connect/connectServer.php";

    //set original skin to 1
    //prepare the command
    $command = "UPDATE userInformation SET `$skinName` = ? WHERE userName = ?";
    $stmt = $dbh->prepare($command);

    //execute the command
    $success = $stmt->execute($args);

    //check if success
    if (!$success) {
        echo ("Fail to execute the command.");
        return false;
    }
}

function getSkin($skinName)
{
    //update old skin 
    updateSkin($_SESSION['skin'],[1,$_SESSION['userName']]);

    //update new skin 
    updateSkin($skinName,[2,$_SESSION['userName']]);

    //connect to the database
    include "../../Connect/connectServer.php";

    //prepare the command
    $command = "UPDATE userInformation SET skin = ? WHERE userName = ?";
    $stmt = $dbh->prepare($command);

    //execute the command
    $args = [$skinName, $_SESSION['userName']];
    $success = $stmt->execute($args);

    //check if success
    if ($success) {
        $_SESSION['skin'] = $skinName;
        return true;
    } else {
        echo ("Fail to execute the command.");
        return false;
    }
}

function pay($price)
{

    //check if the user has enough money
    if ($_SESSION['gold'] < $price) {
        echo ("No enough gold.");
        return false;
    }

    //connect to the database
    include "../../Connect/connectServer.php";

    //prepare the command
    $command = "UPDATE userInformation SET gold = gold - ? WHERE userName = ?";
    $stmt = $dbh->prepare($command);

    //execute the command
    $args = [$price, $_SESSION['userName']];
    $success = $stmt->execute($args);

    //check if success
    if ($success) {
        $_SESSION['gold'] -= $price;
        echo "success";
        return true;
    } else {
        echo ("Fail to execute the command.");
        return false;
    }
}

//start session
session_start();

//get inputs
$skinName = filter_input(INPUT_GET, "skinName", FILTER_SANITIZE_SPECIAL_CHARS);
$price = filter_input(INPUT_GET, "price", FILTER_VALIDATE_INT);


if (pay($price)) {
    getSkin($skinName);
} 
