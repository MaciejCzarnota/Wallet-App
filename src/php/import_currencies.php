<?php

include_once("database_config.php");
$postdata = file_get_contents("../assets/currencies.json");
$request = json_decode($postdata, true);

if(isset($postdata) && !empty($postdata)) {
    $currency_names = [];
    foreach ($request as $value) {
        array_push($currency_names, $value);
    }
    $currency_codes = array_keys($request);
    for ($i = 0; $i < count($currency_names); $i++) {
        $query = "INSERT INTO `currencies` (currency_id, name, code) VALUES($i+1, '$currency_names[$i]', '$currency_codes[$i]')";
        $mysqli->query($query);
    }
}

?>