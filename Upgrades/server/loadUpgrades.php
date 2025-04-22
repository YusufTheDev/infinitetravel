<?php
//start the session
session_start();


$upgradeNames= ["speedBoost","moreHp","default","golden","exGolden","promax","mew","what","big"];
$prices = [300,500,0,100,200,200,200,200,200];
$upgrades = [];
for ($i=0; $i<count($upgradeNames); $i++){
    $upgradeName = $upgradeNames[$i];
    $status = $_SESSION[$upgradeName];
    $price = $prices[$i];

    //send name and status as json
    $json =[ "name" => $upgradeName,"price"=>$price, "status" => $status];
    
    //push to the array
    array_push($upgrades, $json);
}

//send the array as json
echo json_encode($upgrades);