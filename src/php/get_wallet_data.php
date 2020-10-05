<?php

include_once("database_config.php");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if(isset($postdata) && !empty($postdata)) {
    $query = "SELECT name, amount, currency_id as cur from wallets 
    where user_id = $request->userid and wallet_id = $request->walletid;";
    $result = $mysqli->query($query);
    if ($result->num_rows == 1) {
        $row = mysqli_fetch_array($result);
        $myObj['name'] = $row['name'];
        $myObj['amount'] = $row['amount'];
        $myObj['cur'] = $row['cur'];
        $myObj['success'] = true;
    }else { 
        $myObj['success'] = false;
    }
}
$myJSON = json_encode($myObj);
echo $myJSON;
?>