import {modal} from "./modal.js";
import {updateJson} from "./updateJson.js";

export function deleteLink(link){

  console.log(link)

  modal.show();
  modal.content('<h3>Удаление</h3>' +
    '<p>Удалить ссылку "' + link.innerText + '" (' + link.href + ')?</p>' +
    '<button id="deleteLink" class="button modal__ok">Да</button>')

  let deleteBlock = document.getElementById('deleteLink');
    deleteBlock.addEventListener('click', ()=>{
    link.parentElement.remove();
    modal.hide();
    updateJson();
  })


}
