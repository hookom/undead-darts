<?php
    require_once('db.php');

    $season = $_GET['season'];

    $db = new Db();
    $rows = $db -> select("SELECT * FROM `stats-test` WHERE season='$season'");
    echo json_encode($rows);
?>