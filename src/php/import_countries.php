<?php

include_once("database_config.php");
$postdata = file_get_contents("https://restcountries.eu/rest/v2/all");
$request = json_decode($postdata, true);

if(isset($postdata) && !empty($postdata)) {
    $i = 1;
    foreach ($request as $value) {
        $name = $utf8$value['name'];
        $alpha3Code = $value['alpha3Code'];
        $query = "INSERT INTO `countries` (country_id, name, alpha3code) VALUES($i, '$name', '$alpha3Code')";
        $mysqli->query($query);
        $i++;
    }
}

?>