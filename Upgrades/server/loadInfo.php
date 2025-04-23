<?php
session_start();
$info = ["gold" => $_SESSION["gold"], "skin" => $_SESSION["skin"]];
echo json_encode($info);
