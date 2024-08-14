import {api} from './api.js'
import {API_URL} from './const.js'
import {navigation} from "./navigation.js";
import customContextMenu from "./customContextMenu.js";
import {getCookie} from "./getCookie.js";

const links = {

  listDOM: null,

  init(user){

    this.listDOM = document.getElementById('linkmarksList');
    if(!this.listDOM){
      console.log('Can`t find element #linkmarksList');
      return;
    }

    // localStorage.linkmarks = JSON.stringify(result);
    // return [{"title":"Page1","linkmarks":{"Block1":[{"url":"https://google.com/","title":"google.com"}]}}]

    let cookie = JSON.parse(getCookie('linkmarks'));

    if(user===cookie['login']){
      let request = {
        data: {
          method:"fetchLinks"
        }
      }

      api(API_URL,'POST', request).then((result)=> {
        if(result.result){


          navigation(result.json);
          customContextMenu.init();
        }else {
          window.location='https://hosteria.ru/linkmarks/404/';
        }

      })
    }else{
      window.location='https://hosteria.ru/linkmarks/404/';
    }



  },

}

export default links;
