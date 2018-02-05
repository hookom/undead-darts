<?php
    require_once('db.php');

    $db = new Db();
    $rows = $db -> select("SELECT * FROM `changelog-test` ORDER BY timestamp DESC LIMIT 20");
    echo json_encode($rows);
?>
