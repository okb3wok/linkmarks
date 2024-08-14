<?php

$url  =  $_SERVER["REQUEST_URI"];
$url = preg_replace("/^\/?linkmarks/", "", $url);
$url = preg_replace("/\?(.*)$/", "", $url);
$url = preg_replace("/^\/?/", "", $url);
$url = preg_replace("/\/$/", "", $url);

include 'linkmarks.php';
include 'config.php';


require '/var/www/hosteria.ru/linkmarks/vendor/autoload.php';

$twig_loader = new \Twig\Loader\FilesystemLoader('/var/www/hosteria.ru/linkmarks/src/twig/');
$twig = new \Twig\Environment($twig_loader, array( 'cache' => '/var/www/hosteria.ru/linkmarks/compilation_cache', 'auto_reload' => true ));

$cookie = json_decode($_COOKIE['linkmarks'],true);

if($cookie['psuid']){
  $isAuth=true;
}

if($url==''){
  echo $twig->render('index.twig',
    ['pageTitle' => "Удобная система хранения ссылок | Линкмаркс",
      'isAuth' => $isAuth,
      'isMain' => true,
      'user'=>$cookie['login']
    ]);
}elseif($url=='404'){
  header("HTTP/1.0 404 Not Found");
  echo $twig->render('404.twig',
    [ 'isAuth' => $isAuth,
      'isMain' => true,
      'user'=>$cookie['login']
    ]);
}elseif($url=='logout'){
  setcookie('linkmarks', '{}', time() - 3600, "/", ".".$_SERVER['HTTP_HOST']);
  header('Location: https://hosteria.ru/linkmarks/');

}elseif($url=='auth'){ //Registration - Authentication

  if($_GET['code']){

    $linkmarks = new linkmarks();

    $data = $linkmarks -> get_data(CLIENT_ID, CLIENT_SECRET);

    $obj = new stdClass();
    $obj->login = $data['login'];
    $obj->psuid = $data['psuid'];

    if(!$linkmarks->is_file_exist($data['login'] . ".json","./jsons/")){
      $newUser = new stdClass();
      $newUser-> user = ['login'=>$data['login'],
                        'psuid'=>$data['psuid']];
      $newUser-> linkbase[] = ["title"=>"Page 1",
                          "linkmarks"=>[]];
      $JSONstring = json_encode($newUser, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
      $handle = fopen("./jsons/".$data['login'] . ".json", "w+");
      fwrite($handle, $JSONstring);
      fclose($handle);
    }
    setcookie('linkmarks', json_encode($obj,JSON_UNESCAPED_UNICODE), time()+12*2592000, "/", ".".$_SERVER['HTTP_HOST']);
  }
  header('Location: https://hosteria.ru/linkmarks/'.$data['login']);
  exit;
}else{
  preg_match('/^[0-9a-z_\-.]{3,}$/', $url, $matches);
  if($matches){

    if($cookie['login'] != $url){
      $isAuth = false;
    }

    echo $twig->render('main.twig',
      ['pageTitle' => $matches[0]." | Линкмаркс",
        'isAuth' => $isAuth,
        'isMain' => false,
        'user'=>$cookie['login']
      ]);
  }else{
    header('Location: https://hosteria.ru/linkmarks/404/');
  }

}
