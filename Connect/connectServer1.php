<?php
try {
    $dbh = new PDO(
        "mysql:host=localhost;dbname=het33_db",
        "root",
        ""
    );
} catch (Exception $e) {
    die("ERROR: Couldn't connect. {$e->getMessage()}");
}
