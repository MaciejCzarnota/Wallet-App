<?php

include_once("database_config.php");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if(isset($postdata) && !empty($postdata)) {
    
    $query = "SELECT username FROM users 
    WHERE user_id = '$request->userid';";
    $result = $mysqli->query($query);
    if ($result->num_rows == 1) {
        $myObj['username'] = mysqli_fetch_array($result)['username'];
        $myObj['isFound'] = true;
    }else {
        $myObj['isFound'] = false;
    }

    $myJSON = json_encode($myObj);

    echo $myJSON;

}else {
    echo "This page is only for back-end service.";
}

?>