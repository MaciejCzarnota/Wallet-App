<?php

include_once("database_config.php");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if(isset($postdata) && !empty($postdata)) {
    $query = "SELECT * FROM users
    WHERE user_id = '$request->userid' AND
    password = MD5('$request->password');";
    $result = $mysqli->query($query);
    if ($result->num_rows == 1) {
        $query1 = "DELETE FROM users_data
            WHERE user_id='$request->userid';";
        $mysqli->query($query1);
        $query2 = "DELETE FROM wallets
            WHERE user_id='$request->userid';";
        $mysqli->query($query2);
        $query3 = "DELETE FROM history
            WHERE user_id='$request->userid';";
        $mysqli->query($query3);
        $query4 = "DELETE FROM users
            WHERE user_id='$request->userid';";
        if ($mysqli->query($query4)) {
            $myObj['success'] = true;
        }else {
            $myObj['success'] = false;
        }
    }else {
        $myObj['success'] = false;
    }
    $myJSON = json_encode($myObj);
    echo $myJSON;
}else {
    echo "This page is only for back-end service.";
}

?>