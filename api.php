<?php

//header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Headers: *");

include 'config.php';
include 'linkmarks.php';
$postData = file_get_contents('php://input');
$postArray = json_decode($postData, true);
$headers = getallheaders();



function if_not_authorization_exit($headers): void
{
  $cookie = json_decode($_COOKIE["linkmarks"],true);

  if($headers['Authorization'] !== $cookie["psuid"]){
    echo '{"result":0,"error":1,"status":"Authorization Required"}';
    exit;
  }
}




if(count($postArray["data"])>0){
  $method=$postArray["data"]["method"];
  $user_name = $postArray["data"]["user"];

  if(linkmarks::is_file_exist($user_name . ".json","./jsons/")){
    $path_json_file = "./jsons/" . $user_name . ".json";
  }else{
    echo '{"result":0,"error":1,"status":"404 Not Found"}';
    exit;
  }

  switch ($method) {
    case "fetchLinks":
      if_not_authorization_exit($headers);
      $JSONstring = file_get_contents("./jsons/" . $user_name . ".json");
      $JSONarray = json_decode($JSONstring, true);
      $JSONarray = $JSONarray["linkbase"];
      $JSONstring = json_encode($JSONarray,JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
      echo '{"result":1,"error":0,"json":' . $JSONstring . '}';
      break;

    case "updateJSON":
      if_not_authorization_exit($headers);
      $JSONstring = file_get_contents($path_json_file);
      $linksArray = json_decode($JSONstring, true);
      $linksArray["linkbase"][$postArray["data"]["page"]]=$postArray["data"]["newJSON"];
      $JSONstring = json_encode($linksArray, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
      $handle = fopen($path_json_file, "w+");
      fwrite($handle, $JSONstring);
      fclose($handle);
      echo '{"result":1,"error":0,"status":"' . $_SERVER['HTTP_ACCEPT_LANGUAGE'] . '"}';
      break;


    case "addNewPage":
      if_not_authorization_exit($headers);
      $JSONstring = file_get_contents($path_json_file);
      $linksArray = json_decode($JSONstring, true);
      $newStdObj=new stdClass();
      $newStdObj->title=$postArray["data"]["pageName"];
      $newStdObj->linkmarks=[];
      $linksArray['linkbase'][] =  $newStdObj;
      $JSONstring = json_encode($linksArray, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
      $handle = fopen($path_json_file, "w+");
      fwrite($handle, $JSONstring);
      fclose($handle);
      echo '{"result":1,"error":0,"status":"ok"}';
      break;


    case "deletePage":
      if_not_authorization_exit($headers);
      $JSONstring = file_get_contents($path_json_file);
      $linksArray = json_decode($JSONstring, true);
      $part1=array_slice($linksArray["linkbase"], 0, $postArray["data"]["pageId"]-1);
      $part2=array_slice($linksArray["linkbase"], $postArray["data"]["pageId"]);
      $linksArray["linkbase"] = array_merge($part1, $part2);
      $JSONstring = json_encode($linksArray, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
      $handle = fopen($path_json_file, "w+");
      fwrite($handle, $JSONstring);
      fclose($handle);
      echo '{"result":1,"error":0,"status":"ok"}';
      break;


    case "moveBlock":
      if_not_authorization_exit($headers);
      $JSONstring = file_get_contents($path_json_file);
      $linksArray = json_decode($JSONstring, true);
      $arrayFrom = $linksArray["linkbase"][$postArray["data"]["pageIdFrom"]-1]["linkmarks"];
      $blockForMove = $arrayFrom[$postArray["data"]["blockName"]];
      $newArrayFrom =[];
      foreach ($arrayFrom as $key=>$val) {
        if($key!==$postArray["data"]["blockName"]){
          $newArrayFrom[$key] = $val;
        }
      }
      $linksArray["linkbase"][$postArray["data"]["pageIdFrom"]-1]["linkmarks"] = $newArrayFrom;
      $linksArray["linkbase"][$postArray["data"]["pageIdTo"]-1]["linkmarks"][$postArray["data"]["blockName"]] = $blockForMove;
      $JSONstring = json_encode($linksArray, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
      $handle = fopen($path_json_file, "w+");
      fwrite($handle, $JSONstring);
      fclose($handle);
      echo '{"result":1,"error":0,"status":"ok"}';
      break;

    case "pageMove":
      if_not_authorization_exit($headers);
      $JSONstring = file_get_contents($path_json_file);
      $linksArray = json_decode($JSONstring, true);
      $pageForMove = $linksArray["linkbase"][$postArray["data"]["pageForMove"] - 1];

      $part1=array_slice($linksArray["linkbase"], 0, $postArray["data"]["pageForMove"] - 1);
      $part2=array_slice($linksArray["linkbase"], $postArray["data"]["pageForMove"]);
      $linksArray["linkbase"] = array_merge($part1, $part2);

      if($postArray["data"]["pageForMove"]<=$postArray["data"]["pagePositionAfter"]){
        $part3=array_slice($linksArray["linkbase"], 0, $postArray["data"]["pagePositionAfter"]);
        $part3[]=$pageForMove;
        $part4=array_slice($linksArray["linkbase"], $postArray["data"]["pagePositionAfter"]);
      }else{
        $part3=array_slice($linksArray["linkbase"], 0, $postArray["data"]["pagePositionAfter"]+1);
        $part3[]=$pageForMove;
        $part4=array_slice($linksArray["linkbase"], $postArray["data"]["pagePositionAfter"]+1);
      }

      $linksArray["linkbase"] = array_merge($part3, $part4);
      $JSONstring = json_encode($linksArray, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
      $handle = fopen($path_json_file, "w+");
      fwrite($handle, $JSONstring);
      fclose($handle);
      echo '{"result":1,"error":0,"status":"ok"}';
      break;


    default:
      echo '{"result":0,"error":1,"errordescription":"Wrong request"}';
  }

}else
{
  echo '{"result":0,"error":1,"errordescription":"Wrong request"}';
}


