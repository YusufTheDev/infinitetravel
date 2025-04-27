<?php
/**
 * Author : Tianyan He
 * Student Number: 400579318
 * Date: 2025/04/16
 *
 * get gold and current skin
 */

session_start();
$info = ["gold" => $_SESSION["gold"], "skin" => $_SESSION["skin"]];
echo json_encode($info);
