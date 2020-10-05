<?php

include_once("database_config.php");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if(isset($postdata) && !empty($postdata)) {
    $myObj = array();
    $query = "SELECT w.wallet_id, w.name, w.amount, c.code as cur  from wallets w 
    join currencies c on w.currency_id = c.currency_id
    where w.user_id = $request->userid;";
    $result = $mysqli->query($query);
    if ($result->num_rows > 0) {
        $i = 0;
        while ($row = mysqli_fetch_array($result)) {
            $myObj[$i]['id'] = $row['wallet_id'];
            $myObj[$i]['name'] = $row['name'];
            $myObj[$i]['amount'] = $row['amount'];
            $myObj[$i]['cur'] = $row['cur'];
            $i++;
        }
    }
    $myJSON = json_encode($myObj);
    echo $myJSON;
}
?>