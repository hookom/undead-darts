<?php
    require_once('db.php');

    $season = $_GET['season'];

    $db = new Db();
    $result = $db -> query("INSERT INTO season (season) VALUES ('$season'));
    echo json_encode($result);
?>
