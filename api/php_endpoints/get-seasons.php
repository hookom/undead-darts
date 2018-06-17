<?php
    require_once('db.php');

    $db = new Db();
    $rows = $db -> select("SELECT DISTINCT season FROM stats");
    echo json_encode($rows);
?>
