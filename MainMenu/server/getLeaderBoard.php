<!-- 
Author : Tony He 
Student Number: 400579318
Date: 2025/04/15

php file to get leader info from server and respond to js
-->
<?php
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
