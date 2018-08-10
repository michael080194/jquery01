<?php
  $title = "";
  if($_GET['title']){
    $title = $_GET['title'];
  }

  if($_GET['url'] == "kyc"){
    echo "冠宇資訊有限公司" . $title;
  } else {
    echo "沒有傳網址";
  }
?>