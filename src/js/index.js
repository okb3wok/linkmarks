import  links  from './links.js'
import authorization from "./authorization.js";
import {modal} from "./modal.js";
import {getCookie} from "./getCookie.js";

document.addEventListener('DOMContentLoaded', ()=> {

  let url =new URL(location.href)
  let path = url.pathname.match(/^\/linkmarks\/(.*)\/$/);

  if(path){
    links.init(path[1]);
  }

  // let cookie = JSON.parse(getCookie('linkmarks'));
  // document.getElementById('msg').innerHTML='<div>' + cookie['login']?'<a href="https://hosteria.ru/linkmarks/'+cookie['login']+'/">'+cookie['login']+'</a>':'' + '</div>';


  modal.init();


  let regNewUserButton = document.getElementById('regNewUserButton');
  if(regNewUserButton){
    regNewUserButton.addEventListener('click',()=>{
      modal.show();
      modal.content('<h3>Вход</h3>' +
        '<p>Войти через сервис авторизации <strong>Яндекс.ID</strong> ?</p>' +
        '<button id="startRegNewUser" class="button modal__ok">Хорошо</button>')


      document.getElementById('startRegNewUser').addEventListener('click',()=>{
        window.location='https://oauth.yandex.ru/authorize?response_type=code&client_id=6c6835b0711f425d9af4f3bf908c6a83';
      })
    })
  }

  let exitUserButton = document.getElementById('exitUserButton');
  if(exitUserButton){
    exitUserButton.addEventListener('click',()=>{
      window.location='https://hosteria.ru/linkmarks/logout/';
    })
  }


});
