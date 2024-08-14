import {modal} from "./modal.js";
import {api} from "./api.js";
import {API_URL} from "./const.js";

export function addNewPage (){

  modal.show();
  modal.content('<h3>Добавить новую страницу</h3>' +
    '<p><label for="pageName">Hазвание страницы:</label> ' +
    '<input id="pageName" class="modal__input" value=""/></p>' +
    '<button id="addPageButton" class="button modal__ok">ОК</button>')


  let addPageButton = document.getElementById('addPageButton')

  addPageButton.addEventListener('click', ()=>{

    let request = {
      data: {
        method:"addNewPage",
        pageName: document.getElementById('pageName').value+'',
      }
    }

    api(API_URL,'POST', request).then((result)=> {
      console.log(result)
      window.location.reload();
    })

    modal.hide();
  })

}
