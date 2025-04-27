<?php
/**
 * Author : Tianyan He
 * Student Number: 400579318
 * Date: 2025/04/16
 *
 * A php file to make purchase. Check if gold is enough, buy and get the skin
 */

function updateSkinStatus($skinName,$args)
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
        die();
    }

    //update session
    $_SESSION[$skinName] = $args[0];
}

/**
 * update the current using skin in session and db
 */
function updateSkin($skinName){

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
        die();
    }
}

/**
 * make skin purchased db
 */
function getSkin($skinName)
{
    //if not skin
    if($skinName == "speedBoost" || $skinName == "moreHp" ){
        updateSkinStatus($skinName,[2,$_SESSION['userName']]);
        return true;
    }
    //update old skin 
    updateSkinStatus($_SESSION['skin'],[1,$_SESSION['userName']]);

    //update new skin 
    updateSkinStatus($skinName,[2,$_SESSION['userName']]);

    updateSkin($skinName);

}

/**
 * pay money
 */
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
        return true;
    } else {
        echo ("Fail to execute the command.");
        die();
    }
}

//start session
session_start();

//get inputs
$skinName = filter_input(INPUT_GET, "skinName", FILTER_SANITIZE_SPECIAL_CHARS);
$price = filter_input(INPUT_GET, "price", FILTER_VALIDATE_INT);

//check if price is received
if ($price != null) {
    if (pay($price)) {
        getSkin($skinName);
        echo "success";
    } 
}
else{
    //update old skin 
    updateSkinStatus($_SESSION['skin'],[1,$_SESSION['userName']]);

    //update new skin 
    updateSkinStatus($skinName,[2,$_SESSION['userName']]);

    updateSkin($skinName);

    echo "success";

}


