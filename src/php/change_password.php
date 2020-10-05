<?php

include_once("database_config.php");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if(isset($postdata) && !empty($postdata)) {
    $query = "SELECT user_id, MD5('$request->new_password') as md5password FROM users
    WHERE user_id = '$request->user_id' AND
    password = MD5('$request->current_password');";
    $result = $mysqli->query($query);
    if ($result->num_rows == 1) {
        $row = mysqli_fetch_array($result);
        $myObj['userid'] = $row['user_id'];
        $myObj['password'] = $row['md5password'];
        $query1 = "UPDATE users
        SET password = MD5('$request->new_password')
        WHERE user_id='$request->user_id' AND password=MD5('$request->current_password');";
        if ($mysqli->query($query1)) {
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