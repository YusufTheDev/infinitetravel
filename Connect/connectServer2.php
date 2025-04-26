<?php
/**
 * Author : Tony He 
 * Student Number: 400579318
 * Date: 2025/04/01
 *
 * This is php file used to connect to database on school server
 */
try {
    $dbh = new PDO(
        "mysql:host=localhost;dbname=het33_db",
        "het33",
        "HTYhty241632"
    );
} catch (Exception $e) {
    die("ERROR: Couldn't connect. {$e->getMessage()}");
}
