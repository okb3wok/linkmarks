import {modal} from "./modal.js";
import {updateJson} from "./updateJson.js";

export function pageEdit(page){

  modal.show();
  if(document.getElementById('navigation').contains(page)){

    modal.content('<h3>Редактировать</h3>' +
      '<p><label for="pageName">Hазвание страницы:</label> ' +
      '<input id="pageName" class="modal__input" value="' + page.innerText + '"/></p>' +
      '<button id="editPage" class="button modal__ok">ОК</button>')


    let editPage = document.getElementById('editPage');

    editPage.addEventListener('click',(evnt)=>{
      document.getElementById(page.id).innerText = document.getElementById('pageName').value;
      modal.hide();
      updateJson();
    })

  }

}
