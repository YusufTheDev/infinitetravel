<?php
//start the session
session_start();
// Check if the user is logged in
$isLoggedIn = isset($_SESSION['userName']);
?>

<!DOCTYPE html>
<html>

<head>
    <title>Infinite Travel - Main Menu</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <script src="js/script.js"></script>
</head>

<body>
    <div id="header">
        <h1>Account</h1>
    </div>
    <div id="content">
        <?php
        //check if the user is logged in
        if ($isLoggedIn) {
            echo "<h2>" . $_SESSION['userName'] . "</h2>";
            echo "<div id = gold>";
            echo "<img class = 'img' src='img/gold.png'>";
            echo "<p>" . $_SESSION["gold"] ."</p>";
            echo "</div>";
            echo "<div id = bestScore>";
            echo "<p>Best Score: " . $_SESSION["bestScore"] . "</p>";
            echo "</div>";
            echo "<a href='ChangePassword/index.html' class='button'>Change password</a>";
            echo "<a href='../MainMenu/index.php' class='button'>Back to Menu</a>";
        } else {
            echo 'Fail to load account page';
        }
        ?>
    </div>

</body>

</html>