<?php
    require_once('db.php');

    $db = new Db();
    $rows = $db -> select("SELECT * FROM changelog ORDER BY timestamp DESC");
    echo json_encode($rows);
?>