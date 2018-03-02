<?php
    require_once('db.php');

    $request = json_decode($_POST['data']);
    $id = $request->id;
    $names = $request->names;

    $db = new Db();
    foreach(explode(',', $names) as $name) {
        $db -> query("INSERT INTO `stats` (name, season) VALUES ('$name', '$id')");
    }
?>