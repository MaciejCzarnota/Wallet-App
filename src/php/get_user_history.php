<?php

include_once("database_config.php");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if(isset($postdata) && !empty($postdata)) {
    $myObj = array();
    $query = "SELECT information, entry_date FROM history 
    WHERE user_id = '$request->userid'";
    $result = $mysqli->query($query);
    if ($result->num_rows > 0) {
        $i = 0;
        while ($row = mysqli_fetch_array($result)) {
            $myObj[$i]['information'] = $row['information'];
            $myObj[$i]['entry_date'] = $row['entry_date'];
            $i++;
        }
    }

    $myJSON = json_encode($myObj);

    echo $myJSON;

}else {
    echo "This page is only for back-end service.";
}

?>