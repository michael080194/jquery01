<?php
$server_key = $_POST['server_key'];
$token      = array($_POST['token']);
$title      = $_POST['title'];
$body       = $_POST['body'];
// file_put_contents("z_test_file.txt", $server_key . "\r\n" . $token . "\r\n" . $title . "\r\n" . $body, FILE_APPEND | LOCK_EX);
// die($server_key);

// define('server_key', 'AIzaSyDZjHWHKkaTcGW9jS-_HTGQlxsbDx4edHE');
// $token = ['eztdQ9VKBV8:APA91bFKiQ-7f1wK5gvZCpX8nd6CR3XK87ShZBLFdyK_TCHQQxoFSNgLkep5If3Mc3HEAznf4JjBd6gY-5z1yVhnuBUA5ZPDwYgMN-eP_qhrLz4GGpKvuaL6KD_nhygfoZRfRVkrZZwy'];

$header = [
    'Authorization:key=' . $server_key,
    'Content-Type:application/json',
];

$msg = [
    'title'        => $title,
    'body'         => $body,
    'icon'         => 'icons/icon36.png',
    'image'        => 'icons/notification.png',
    'click_action' => 'https://repair-b974d.firebaseapp.com',
];

$payload = [
    'registration_ids' => $token,
    'data'             => $msg,
];

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL            => "https://fcm.googleapis.com/fcm/send",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CUSTOMREQUEST  => "POST",
    CURLOPT_POSTFIELDS     => json_encode($payload),
    CURLOPT_HTTPHEADER     => $header,
));

$response = curl_exec($curl);
$err      = curl_error($curl);

curl_close($curl);

if ($err) {
    echo "cURL Error #:" . $err;
} else {
    echo $response;
}
