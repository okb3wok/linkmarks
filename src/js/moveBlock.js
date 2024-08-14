import {modal} from "./modal.js";
import {api} from "./api.js";
import {API_URL} from "./const.js";

export function moveBlock (blockForMove){

  modal.show();

  let nameBlockForMove = blockForMove.querySelector('.linkmarks__block-title').innerText;
  modal.content('<h3>Перемещение</h3>' +
    '<p>Куда переместить блок "' + nameBlockForMove + '"?</p>' +
    '<p><select class="modal__input" name="moveToPage" ></select></p>' +
    '<button id="moveBlock" class="button modal__ok">Да</button>')

  let select = document.querySelector('select[name="moveToPage"]');

  document.getElementById('navigation').querySelectorAll('a').forEach(el=>{

    if(!el.classList.contains('active')){
      select.insertAdjacentHTML('beforeend','<option value="' + el.id + '" >' + el.innerText + '</option>')
    }


  })

  document.getElementById('moveBlock').addEventListener('click', ()=>{

    console.log(nameBlockForMove + ' -> ' + select.value)

    let request = {
      data: {
        method:"moveBlock",
        blockName: nameBlockForMove,
        pageIdFrom:document.querySelector('.active').id,
        pageIdTo: select.value
      }
    }

    api(API_URL,'POST', request).then((result)=> {
      console.log(result)
      window.location.reload();
    })

    modal.hide();

  })

}
