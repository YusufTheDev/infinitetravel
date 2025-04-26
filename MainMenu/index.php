<!-- 
Author : Yusuf Khan
Student Number: 400565596
Date: 2025/04/01

The index page for main menu. Displays different content based on whether user logged in or not.
--> 
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
    <link rel="stylesheet" href="css/style1.css">
    <script src="js/script.js"></script>
</head>

<body>
    <div id="menu">
        <h1>Infinite Travel</h1>
        <?php
        //check if the user is logged in
        if ($isLoggedIn) {
            echo '<a href="../game/play.html" class="button">Play</a>';
            echo '<a href="../Upgrades/index.php" class="button">Upgrades</a>';
            echo '<a href="instructions.html" class="button">Tutorial</a>';
            echo '<a href="leaderBoard.html" class="button">Leader Board</a>';
            echo '<a href="../Account/index.php" class="button">Account</a>';
            echo '<button id="logout">Logout</button>';
        } else {
            echo '<a href="../SignUp/index.html" class="button">Sign Up</a>';
            echo '<a href="../Login/index.html" class="button">Login</a>';
        }
        ?>
    </div>
</body>

</html>