
<?php
/**
 * Author : Tony He 
 * Student Number: 400579318
 * Date: 2025/04/01
<<<<<<< HEAD
 *
 * This is php file used to connect to database on local server
=======
 * This is php file used to connect to local database
>>>>>>> 07b63f73d27b50df829b93568849f962b4ebe4ad
 */
try {
    $dbh = new PDO(
        "mysql:host=localhost;dbname=het33_db",
        "root",
        ""
    );
} catch (Exception $e) {
    die("ERROR: Couldn't connect. {$e->getMessage()}");
}
