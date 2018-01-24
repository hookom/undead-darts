<?php
    require_once('db.php');

    $request = json_decode($_POST['data']);
    $name = $request->name;
    $field = $request->field;
    $value = $request->value;
    $season = $request->season;

    $querystring = "UPDATE stats SET $field='$value' WHERE name='$name' AND season='$season'";
    $db = new Db();
    $result = $db -> query($querystring);
    echo json_encode($result);
?>