<?php

include_once("database_config.php");
$myObj = array();
$query = "SELECT country_id, name FROM countries;";
$result = $mysqli->query($query);
if ($result->num_rows > 0) {
    $i = 0;
    while ($row = mysqli_fetch_array($result)) {
        $myObj[$i]['country_id'] = $row['country_id'];
        $myObj[$i]['name'] = $row['name'];
        $i++;
    }
}

$myJSON = json_encode($myObj);

echo $myJSON;

?>