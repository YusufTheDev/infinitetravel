<?php
//start the session
session_start();


$upgradeNames= ["speedBoost","moreHp","default","golden","exGolden","promax","mew","what","big"];
$prices = [300,500,0,100,200,200,200,200,200];
$descriptions = ["Increase player speed","More HP","Original Skin","A better skin","Double jump","Gliding","A tank","??","????"];
$upgrades = [];
for ($i=0; $i<count($upgradeNames); $i++){
    $upgradeName = $upgradeNames[$i];
    $status = $_SESSION[$upgradeName];
    $price = $prices[$i];
    $description = $descriptions[$i];

    //send name and status as json
    $json =[ "name" => $upgradeName,"price"=>$price,"description"=> $description, "status" => $status];
    
    //push to the array
    array_push($upgrades, $json);
}

//send the array as json
echo json_encode($upgrades);