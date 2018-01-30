<?php
    require_once('db.php');

    $request = json_decode($_POST['data']);
    $name = $request->name;
    $field = $request->field;
    $value = $request->value;
    $season = $request->season;
    $timestamp = $request->timestamp;
    $change = $request->change;

    $db = new Db();
    $updatestring = "UPDATE `stats-test` SET $field='$value' WHERE name='$name' AND season='$season'";
    $result = $db -> query($updatestring);
    $insertstring = "INSERT INTO `changelog-test` VALUES ('$change', '$timestamp')";
    $result = $db -> query($insertstring);
    echo json_encode($result);
?>