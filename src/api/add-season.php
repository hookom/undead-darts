<?php

    function debug_to_console( $data ) {
        $output = $data;
        if ( is_array( $output ) )
            $output = implode( ',', $output);
    
        echo "<script>console.log( 'Debug Objects: " . $output . "' );</script>";
    }

    require_once('db.php');

    $stats = json_decode($_POST['data']);

    $db = new Db();
    
    $querystring = "INSERT INTO stats VALUES (";

    foreach($stats as $row) {
        foreach ($row as $key => $value) {
            $querystring .= "$value, "
        }
    }

    $querystring .= ")";

    debug_to_console($querystring);
    // $db -> query($querystring);
?>
