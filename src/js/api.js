import authorization from "./authorization.js";
import {getCookie} from "./getCookie.js";

export async function api(url, method='POST', payload) {



  if(!document.cookie){
    return
  }


  let cookie = JSON.parse(getCookie('linkmarks'));
  payload['data']['user']=cookie['login'];
  let response = await fetch(url,{
      method: method,
      headers: {'Authorization': cookie['psuid'] },
      //mode: 'no-cors',
      body: JSON.stringify(payload),
  });

  if (response.ok) {
    let json = await response.json();

    if(json.error && json.status==='Authorization Required'){
      authorization.showForm();
      authorization.init(cookie['user']);
    }

    return json;
  }
  else {
      console.log("Ошибка HTTP: " + response.status);
  }

}
