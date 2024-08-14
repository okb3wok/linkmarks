import {modal} from "./modal.js";
import {updateJson} from "./updateJson.js";

export function editLink(link){

  console.log(link);
  modal.show();

  modal.content('<h3>Редактировать</h3>' +
    '<p><label for="linkmarkURL">URL:</label> <input id="linkmarkURL" class="modal__input" value="' + link.href + '" /></p>\n' +
    '<p><label for="linkmarkTitle">Описание:</label> <input id="linkmarkTitle" class="modal__input" value="' + link.innerText + '" /></p>\n' +
   '<button id="editLink" class="button modal__ok">ОК</button>')

  let editLink = document.getElementById('editLink');
  editLink.addEventListener('click',()=>{

    const url = document.getElementById('linkmarkURL').value;
    const title = document.getElementById('linkmarkTitle').value;


    link.href = url;
    link.innerText = title;
    updateJson();
    modal.hide();

  })


}
