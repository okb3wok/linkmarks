import {modal} from "./modal.js";
import {updateJson} from "./updateJson.js";

export function userSettings(){


  modal.show();
  modal.content('<h3>Настройки</h3>' +

    '<button id="editSettings" class="button modal__ok">OK</button>')

  let editSettings = document.getElementById('editSettings');
  editSettings.addEventListener('click', ()=>{
    modal.hide();
  })


}
