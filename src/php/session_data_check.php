<?php

include_once("database_config.php");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if(isset($postdata) && !empty($postdata)) {
    
    $query = "SELECT * FROM users 
        WHERE user_id = '$request->userid' AND 
        password = '$request->password'";    
    $result = $mysqli->query($query);
    if ($result->num_rows == 1) {
        $myObj['correctdata'] = true;
    }else {
        $myObj['correctdata'] = false;
    }
    $myJSON = json_encode($myObj);

    echo $myJSON;

}else {
    echo "This page is only for back-end service.";
}

?>