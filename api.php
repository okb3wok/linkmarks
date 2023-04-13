<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$postData = file_get_contents('php://input');
$postArray = json_decode($postData, true);
$method=$postArray["data"]["method"];

if(count($postArray["data"])>0){

    if($method=="addNewCategory"){

        $JSONstring = file_get_contents("links.json");
        $linksArray = json_decode($JSONstring, false);
        $linksArray->{$postArray["data"]["newcategory"]}=[];
        $JSONstring = json_encode($linksArray, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        $handle = fopen("links.json", "w+");
        fwrite($handle, $JSONstring);
        fclose($handle);
        echo '{"result":1,"error":0,"status":"ok"}';

    }elseif($method=="addLink"){
        $JSONstring = file_get_contents("links.json");
        $linksArray = json_decode($JSONstring, false);
        $obj = new stdClass();
        $obj->title = $postArray["data"]["title"];
        $obj->url = $postArray["data"]["url"];
        array_push($linksArray->{$postArray["data"]["category"]}, $obj);

        $JSONstring = json_encode($linksArray, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        $handle = fopen("links.json", "w+");
        fwrite($handle, $JSONstring);
        fclose($handle);
        echo '{"result":1,"error":0,"status":"ok"}';

    }elseif($method=="deleteCategory"){
        $JSONstring = file_get_contents("links.json");
        $linksArray = json_decode($JSONstring, false);
        unset( $linksArray->{$postArray["data"]["category"]});

        $JSONstring = json_encode($linksArray, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        $handle = fopen("links.json", "w+");
        fwrite($handle, $JSONstring);
        fclose($handle);
        echo '{"result":1,"error":0,"status":"ok"}';

    }elseif($method=="fetchLinks"){
        $JSONstring = file_get_contents("links.json");
        echo $JSONstring;
    }
    else{
        echo '{"result":0,"error":1,"errordescription":"Wrong request"}';
    }

}else
{
    echo '{"result":0,"error":1,"errordescription":"Wrong request"}';
}
?>