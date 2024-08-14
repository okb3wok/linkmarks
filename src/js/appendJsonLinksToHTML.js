import {dragDrop} from "./dragDrop.js";
import {addNewLink} from "./addNewLink.js";


export function appendJsonLinksToHTML  (json, id){
    let listNode = document.getElementById(id);

    console.log(json)
    let key= undefined;

    for (key in json) {

        let blockLinksString ='<ul class="linkmarks__block-links" >';
        json[key].forEach(el => {
            let url = new URL(el.url);
            blockLinksString = blockLinksString +
                '<li>' +
                '<a href="' + el.url + '" target="_blank">' +
                '<img src="https://s2.googleusercontent.com/s2/favicons?domain_url=' + url.protocol + '//' + url.host + '&size=16" alt="">' + el.title + '</a>' +
                '</li>';

        });

        blockLinksString = blockLinksString + '</ul>';

        let block = document.createElement("div");
        block.classList.add("linkmarks__block");
        block.innerHTML = '<div class="linkmarks__block-header">' +
            '<h2 class="linkmarks__block-title" >' + key + '</h2>' +
            '<div class="linkmarks__block-addlink"><svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="#0E1117" class="sc-fvFlmW hRHjch"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.25 12.75V18H12.75V12.75H18V11.25H12.75V6H11.25V11.25H6V12.75H11.25Z"></path></svg></div>' +
            '</div>' + blockLinksString;
        listNode.appendChild(block);

    }


    listNode.replaceWith(listNode.cloneNode(true));
    document.querySelectorAll('.linkmarks__block-addlink').forEach(
      el=>{
        el.addEventListener('click',event=>{
          let block=null;
          if(event.target.parentElement.classList.contains('linkmarks__block-addlink')){
            block = event.target.parentElement.parentElement.parentElement;
          }else{
            block = event.target.parentElement.parentElement.parentElement.parentElement;
          }
          addNewLink(block);
        })
      }
    )
    dragDrop();

}
