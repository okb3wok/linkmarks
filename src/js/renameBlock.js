import {modal} from "./modal.js";
import {updateJson} from "./updateJson.js";

export function renameBlock(block){

  modal.show();

  modal.content('<h3>Редактировать</h3>' +
    '<p><label for="blockName">Hазвание страницы:</label> ' +
    '<input id="blockName" class="modal__input" value="' + block.querySelector('.linkmarks__block-title').innerText + '"/></p>' +
    '<button id="editBlock" class="button modal__ok">ОК</button>')


  let editBlock = document.getElementById('editBlock');

  editBlock.addEventListener('click',(evnt)=>{
    block.querySelector('.linkmarks__block-title').innerText = document.getElementById('blockName').value;
    modal.hide();
    updateJson();
  })


}
