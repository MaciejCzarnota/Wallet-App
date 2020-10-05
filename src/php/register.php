<?php

include_once("database_config.php");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if(isset($postdata) && !empty($postdata)) {
    
$query1 = "SELECT user_id FROM users WHERE username = '$request->login';";
$result = $mysqli->query($query1);
if ($result->num_rows == 0) {
    $query2 = "INSERT INTO users (username, password)
    VALUES ('$request->login', MD5('$request->password'));";
    $mysqli->query($query2);
    $myObj['isUsernameUsed'] = false;
    $query3 = "SELECT user_id from users where username = '$request->login'";
    $result = $mysqli->query($query3);
    if ($result->num_rows == 1) {
        $user_id = mysqli_fetch_array($result)['user_id'];
        $query4 = "INSERT INTO history (user_id, information, entry_date)
            VALUES ('$user_id', 'Registration of new user.', NOW());";
        if ($mysqli->query($query4)) {
            $myObj['success'] = true;
        }else {
            $myObj['success'] = false;
        }
    }
}else {
    $myObj['isUsernameUsed'] = true;
}
$myJSON = json_encode($myObj);

echo $myJSON;

}else {
    echo "This page is only for back-end service.";
}

?>