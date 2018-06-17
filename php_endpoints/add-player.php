<?php
    require_once('db.php');

    $request = json_decode($_POST['data']);
    $season = $request->season;
    $player = $request->player;

    $db = new Db();
    $db -> query("INSERT INTO `stats` (name, season) VALUES ('$player', '$season')");
?>