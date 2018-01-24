<?php
    require_once('db.php');

    $db = new Db();
    $rows = $db -> select("SELECT * FROM stats");
    echo json_encode($rows);
?>