<?php 
session_start();
if (isset($_SESSION["skin"])) {
    echo ($_SESSION["skin"]);
} else {
    echo "failed";
    exit();
}