<?php
/**
 * Author: Tianyan He
 * Student Number: 400579318
 * Date: 2025/04/17
 *
 * A php file get inputs from game and update gold and bestScore after game is over.
 */


function update($name, $args)
{
    include "../../Connect/connectServer.php";

    $command  = "UPDATE userInformation SET $name = ? WHERE userName = ?";
    $stmt = $dbh->prepare($command);

    $success = $stmt->execute($args);

    if ($success) {
        return true;
    } else {
        echo "fail to update ";
        die();
    }
}
session_start();

$bestScore = filter_input(INPUT_GET, "bestScore", FILTER_VALIDATE_INT);
$gold = filter_input(INPUT_GET, "gold", FILTER_VALIDATE_INT);


if ($bestScore > $_SESSION['bestScore']) {
    $_SESSION['bestScore'] = $bestScore;
    update("bestScore", [$_SESSION['bestScore'], $_SESSION['userName']]);
}

$_SESSION['gold'] += $gold;
update("gold", [$_SESSION['gold'], $_SESSION['userName']]);
