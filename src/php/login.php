<?php

include_once("database_config.php");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if(isset($postdata) && !empty($postdata)) {
    
    $query = "SELECT user_id, password FROM users 
    WHERE username = '$request->login' AND 
    password = MD5('$request->password')";
    $result = $mysqli->query($query);
    if ($result->num_rows == 1) {
        $row = mysqli_fetch_array($result);
        $myObj['userid'] = $row['user_id'];
        $myObj['password'] = $row['password'];
        $myObj['correctdata'] = true;
        $user_id = $row['user_id'];
        $query1 = "INSERT INTO history (user_id, information, entry_date)
            VALUES ('$user_id', 'User signed in.', NOW());";
        $mysqli->query($query1);
    }else {
        $myObj['correctdata'] = false;
    }
    $myJSON = json_encode($myObj);
    echo $myJSON;
}else {
    echo "This page is only for back-end service.";
}

?>