<?php
    require_once('db.php');

    $request = json_decode($_POST['data']);
    $id = $request->id;
    $names = $request->names;
    $statversion = $request->statversion;

    $db = new Db();
    foreach(explode(',', $names) as $name) {
        $db -> query("INSERT INTO `stats` (name, season, statversion) VALUES ('$name', '$id', '$statversion')");
    }
?>