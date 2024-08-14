import {modal} from "./modal.js";
import {api} from "./api.js";
import {API_URL} from "./const.js";

export function movePage (){

  modal.show();

  let pageForMove = document.querySelector('.active');

  modal.content('<h3>Перемещение</h3>' +
    '<p>Поместить страницу "' + pageForMove.innerText + '" после:</p>' +
    '<p><select class="modal__input" name="moveAfterPage" ></select></p>' +
    '<button id="moveBlock" class="button modal__ok">Да</button>')

  let select = document.querySelector('select[name="moveAfterPage"]');

  document.getElementById('navigation').querySelectorAll('a').forEach(el=>{

    if(!el.classList.contains('active')){
      select.insertAdjacentHTML('beforeend','<option value="' + el.id + '" >' + el.innerText + '</option>')
    }


  })

  document.getElementById('moveBlock').addEventListener('click', ()=>{

    console.log('берешь и удаляешь ' + pageForMove.id + ' ставишь после ' + (parseInt(select.value)-1)  )

    let request = {
      data: {
        method:"pageMove",
        pageForMove: parseInt(pageForMove.id),
        pagePositionAfter: parseInt(select.value)-1
      }
    }

    api(API_URL,'POST', request).then((result)=> {
      console.log(result)
      window.location.reload();
    })

    modal.hide();

  })

}
