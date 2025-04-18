<?php
try {
    $dbh = new PDO(
        "mysql:host=localhost;dbname=het33_db",
        "het33",
        "HTYhty241632"
    );
} catch (Exception $e) {
    die("ERROR: Couldn't connect. {$e->getMessage()}");
}
