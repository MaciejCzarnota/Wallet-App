<?php

include_once("database_config.php");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if(isset($postdata) && !empty($postdata)) {
    $query = "SELECT first_name, last_name, email, phone_number, country_id FROM users_data 
    WHERE user_id = '$request->userid';";
    $result = $mysqli->query($query);
    if ($result->num_rows == 1) {
        $row = mysqli_fetch_array($result);
        $myObj['first_name'] = $row['first_name'];
        $myObj['last_name'] = $row['last_name'];
        $myObj['email'] = $row['email'];
        $myObj['phone_number'] = $row['phone_number'];
        $myObj['country_id'] = $row['country_id'];
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