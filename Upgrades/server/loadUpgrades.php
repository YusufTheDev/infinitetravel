<?php
//start the session
session_start();


$upgradeNames= ["speedBoost","moreHp","default","golden","exGolden","promax","mew","what","big"];
$upgrades = [];
for ($i=0; $i<count($upgradeNames); $i++){
    $upgradeName = $upgradeNames[$i];
    $status = $_SESSION[$upgradeName];

    //send name and status as json
    $json =[ "name" => $upgradeName, "status" => $status];
    
    //push to the array
    array_push($upgrades, $json);
}

//send the array as json
echo json_encode($upgrades);