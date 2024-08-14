import {modal} from "./modal.js";
import {updateJson} from "./updateJson.js";

export function addNewBlock (){

  modal.show();
  modal.content('<h3>Добавить новый блок на страницу "' + document.querySelector('.active').innerText + '"</h3>' +
    '<p><label for="blockName">Hазвание блока:</label> ' +
    '<input id="blockName" class="modal__input" value=""/></p>' +
    '<button id="addBlock" class="button modal__ok">ОК</button>')

  let addBlock = document.getElementById('addBlock');

  addBlock.addEventListener('click',()=>{

    document.getElementById('linkmarksList').insertAdjacentHTML('afterbegin',
      '<div class="linkmarks__block">' +
      '<div class="linkmarks__block-header">' +
      '<h2 class="linkmarks__block-title">'+ document.getElementById('blockName').value+'</h2>' +
      '<div class="linkmarks__block-addlink">' +
      '<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="#0E1117" class="sc-fvFlmW hRHjch"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.25 12.75V18H12.75V12.75H18V11.25H12.75V6H11.25V11.25H6V12.75H11.25Z"></path></svg>' +
      '</div>' +
      '</div>' +
      '<ul class="linkmarks__block-links"></ul></div>')

    modal.hide();
    updateJson();

  })

}
