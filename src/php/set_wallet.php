<?php

include_once("database_config.php");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if(isset($postdata) && !empty($postdata)) {
    if ($request->walletid != 0) {
        $query = "UPDATE wallets
        SET name = '$request->name', 
            amount = '$request->amount',
            currency_id = '$request->currencyid' 
        WHERE user_id='$request->userid' 
        AND wallet_id='$request->walletid';";
    }else {
        $query = "INSERT INTO wallets (user_id, name, amount, currency_id)
        VALUES ('$request->userid', '$request->name',
        '$request->amount', '$request->currencyid');";
    }
    if ($mysqli->query($query)) {
        $myObj['success'] = true;
    }else {
        $myObj['success'] = false;
    }

    $myJSON = json_encode($myObj);

    echo $myJSON;

}else {
    echo "This page is only for back-end service.";
}

?>