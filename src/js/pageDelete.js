import {modal} from "./modal.js";
import {api} from "./api.js";
import {API_URL} from "./const.js";

export function pageDelete(page){

  if(document.getElementById('navigation').contains(page)){
    modal.show();
    modal.content('<h3>Удаление</h3>' +
      '<p>Удалить страницу "' + page.innerText + '"?</p>' +
      '<button id="deletePage" class="button modal__ok">Да</button>')


    let deletePage = document.getElementById('deletePage');

    deletePage.addEventListener('click',()=>{

      let request = {
        data: {
          method: "deletePage",
          pageId: page.id
        }
      }

      api(API_URL,'POST', request).then((result)=> {
        //console.log(result)
        window.location.reload();
      })

      modal.hide();

    })

  }

}
