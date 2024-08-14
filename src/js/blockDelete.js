import {modal} from "./modal.js";
import {updateJson} from "./updateJson.js";

export function blockDelete(block){

  modal.show();
  modal.content('<h3>Удаление</h3>' +
    '<p>Удалить блок "' + block.querySelector('.linkmarks__block-title').innerText + '"?</p>' +
    '<button id="deleteBlock" class="button modal__ok">Да</button>')

  let deleteBlock = document.getElementById('deleteBlock');
  deleteBlock.addEventListener('click', ()=>{
    block.remove();
    modal.hide();
    updateJson();
  })


}
