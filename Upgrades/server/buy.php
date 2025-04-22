<?php
//start session
session_start();

//get inputs
$skinName = filter_input(INPUT_GET, "skinName", FILTER_SANITIZE_SPECIAL_CHARS);
$price = filter_input(INPUT_GET,"price", FILTER_VALIDATE_INT);

