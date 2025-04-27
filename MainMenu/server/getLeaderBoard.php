<?php
/**
 * Author : Tianyan He
 * Student Number: 400579318
 * Date: 2025/04/22
 *
 * Send name and score of top 10 player in db.
 */

#connect 
include '../../Connect/connectServer.php';

//prepare
$command = "SELECT userName,bestScore FROM userInformation ORDER BY bestScore DESC LIMIT 10";
$stmt = $dbh->prepare($command);

//execute
$success = $stmt->execute();

$rows = [];

if ($success) {
    while ($row = $stmt->fetch()) {
        array_push($rows, [
            'userName' => $row['userName'],
            'bestScore' => $row['bestScore']
        ]);
    }
    echo json_encode($rows);

} else {
    echo "fail to get leaderboard";
}
