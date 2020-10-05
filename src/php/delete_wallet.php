<?php

include_once("database_config.php");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if(isset($postdata) && !empty($postdata)) {
    $query = "DELETE FROM wallets
        WHERE user_id='$request->userid' 
        AND wallet_id='$request->walletid';";
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