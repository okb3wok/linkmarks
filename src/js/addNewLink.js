import {modal} from "./modal.js";
import {updateJson} from "./updateJson.js";

export function addNewLink (block){

  let category = block.querySelector('.linkmarks__block-title').innerText;
  modal.show();
  modal.content('<h3>Добавить новую закладку в раздел "' + category + '"</h3>\n'+
    '<p><label for="linkmarkURL">URL:</label> <input id="linkmarkURL" class="modal__input"/></p>\n' +
    '<p><label for="linkmarkTitle">Описание:</label> <input id="linkmarkTitle" class="modal__input"/></p>\n' +
    '<input id="linkmarkCategory" type="hidden" value="' + category + '"/>\n' +
    '<button id="linkmarkAdd" class="button modal__ok">ОК</button>');

  linkmarkAdd.addEventListener('click',()=>{

    const url = document.getElementById('linkmarkURL').value;
    const title = document.getElementById('linkmarkTitle').value;

    const newLink = document.createElement("li");
    newLink.innerHTML= '<a href="' + url + '" target="_blank">' + title + '</a>';

    block.querySelector('.linkmarks__block-links').prepend(newLink);
    updateJson();
    modal.hide();

  })

  modal.show();


}
