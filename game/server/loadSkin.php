<?php 
/**
 * Author: Tianyan He
 * Student Number: 400579318
 * Date: 2025/04/17
 *
 * A php file to sent skin.
 */

session_start();
if (isset($_SESSION["skin"])) {
    echo ($_SESSION["skin"]);
} else {
    echo "failed";
    exit();
}