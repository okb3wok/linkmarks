<?php

class linkmarks {

  private $ya_oauth_client_id;
  private $ya_oauth_client_secret;



  public function get_access_token() {

    if (!isset($_GET["code"])) {
      Header("Location: https://oauth.yandex.ru/authorize?response_type=code&client_id=".$this->ya_oauth_client_id);
      die();
    }

    $url="https://oauth.yandex.ru/token";

    $query = [
      'grant_type'=> 'authorization_code',
      'code'=> $_GET["code"],
      'client_id'=> $this->ya_oauth_client_id,
      'client_secret'=> $this->ya_oauth_client_secret
    ];

    $headers = ['Content-type: application/x-www-form-urlencoded'];

    $handle=curl_init();
    curl_setopt($handle, CURLOPT_URL, $url);
    curl_setopt($handle, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($handle, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($handle, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($handle, CURLOPT_POST, true);
    curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($handle, CURLOPT_POSTFIELDS, http_build_query($query));
    $response=curl_exec($handle);
    $arr = json_decode($response,true);
    return $arr["access_token"];
  }

  public function get_data($ya_oauth_client_id, $ya_oauth_client_secret) {
    $this->ya_oauth_client_id = $ya_oauth_client_id;
    $this->ya_oauth_client_secret = $ya_oauth_client_secret;
    $token = $this->get_access_token();
    $url = "https://login.yandex.ru/info";
    $headers = ['Authorization: OAuth '.$token];
    $handle=curl_init();
    curl_setopt($handle, CURLOPT_URL, $url);
    curl_setopt($handle, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($handle, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($handle, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
    $response=curl_exec($handle);
    return json_decode($response,true);
  }


  public static function is_file_exist($filename, $dir){
    $files = scandir($dir);
    if(in_array($filename, $files)){
      return true;
    }else{
      return false;
    }
  }



}
