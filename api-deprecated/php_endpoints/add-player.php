<?php
    require_once('db.php');

    $request = json_decode($_POST['data']);
    $season = $request->season;
    $player = $request->player;
    $statversion = $request->statversion;

    $db = new Db();
    $db -> query("INSERT INTO `stats` (name, season, statversion) VALUES ('$player', '$season', '$statversion')");
?>