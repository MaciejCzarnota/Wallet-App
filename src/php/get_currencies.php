<?php

include_once("database_config.php");
$myObj = array();
$query = "SELECT currency_id, name, code FROM currencies;";
$result = $mysqli->query($query);
if ($result->num_rows > 0) {
    $i = 0;
    while ($row = mysqli_fetch_array($result)) {
        $myObj[$i]['currency_id'] = $row['currency_id'];
        $myObj[$i]['name'] = $row['name'];
        $myObj[$i]['code'] = $row['code'];
        $i++;
    }
}

$myJSON = json_encode($myObj);

echo $myJSON;

?>