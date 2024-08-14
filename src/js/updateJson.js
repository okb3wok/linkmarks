import {api} from "./api.js";
import {API_URL} from "./const.js";

export function updateJson (){

    let activePageId = document.querySelector('.active').id;

    let newJSON = {
        title: document.getElementById(activePageId).innerText,
        linkmarks: {}
    };


    for (const item of document.getElementById('linkmarksList').childNodes) {
        let category = item.querySelector('.linkmarks__block-title').innerText;
        newJSON.linkmarks[category]=[];
        item.querySelector('.linkmarks__block-links').childNodes.forEach((el)=>{
            newJSON.linkmarks[category].push({url:el.firstChild.href, title:el.firstChild.innerText})
        })
    }


    let index = activePageId - 1;
    let request = {
        data: {
            method:"updateJSON",
            page: index,
            newJSON: newJSON
        }
    }

    api(API_URL,'POST', request).then((result)=> {
        //console.log(result)
    })

}
