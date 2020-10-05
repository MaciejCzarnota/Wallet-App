<?php

include_once("database_config.php");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if(isset($postdata) && !empty($postdata)) {
    
    $query1 = "SELECT first_name, last_name, email, phone_number FROM users_data 
    WHERE user_id = '$request->userid';";
    $result = $mysqli->query($query1);
    if ($result->num_rows > 0 && $result->num_rows == 1) {
        $row = mysqli_fetch_array($result);
        $query2 = "UPDATE users_data
            SET first_name = '$request->first_name',
                last_name = '$request->last_name', 
                email = '$request->email',
                phone_number = '$request->phone_number',
                country_id = '$request->country_id' 
            WHERE user_id='$request->userid';";
        if ($mysqli->query($query2)) {
            $myObj['success'] = true;
        }else {
            $myObj['success'] = false;
        }
    }else {
        $query2 = "INSERT INTO users_data
            VALUES ('$request->userid', '$request->first_name',
            '$request->last_name', '$request->email',
            '$request->phone_number', '$request->country_id');";
        if ($mysqli->query($query2)) {
            $myObj['success'] = true;
        }else {
            $myObj['success'] = false;
        }
    }

    $myJSON = json_encode($myObj);

    echo $myJSON;

}else {
    echo "This page is only for back-end service.";
}

?>