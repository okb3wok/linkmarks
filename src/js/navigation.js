import { appendJsonLinksToHTML } from "./appendJsonLinksToHTML.js";
import { addNewPage } from "./addNewPage.js";

export function navigation(json){


    const navigation = document.getElementById('navigation');
    if(!navigation){
        console.log('Can`t find element #navigation');
        return;
    }

    let menuString = '';
    let i=1;


    json.forEach(el=>{
        menuString = menuString + '<li><a href="./#'+ i +'" id="' + i + '">' + el.title + '</a></li>'
        i++
    })

    navigation.insertAdjacentHTML ('beforeend', menuString)


    if(window.location.hash){
        let found = window.location.hash.match(/^#([0-9]{1,2})$/);
        if(found[1]){
            let activeLink = document.getElementById(found[1])
            if(activeLink){
                document.getElementById(found[1]).classList.add('active')
                let linkmarksList =document.getElementById('linkmarksList')
                linkmarksList.innerHTML='';
                appendJsonLinksToHTML(json[found[1]-1]["linkmarks"],'linkmarksList');

            }

        }
    }else{
        document.getElementById('1').classList.add('active')
        appendJsonLinksToHTML(json[0]["linkmarks"],'linkmarksList');

    }

    navigation.addEventListener('click', el=>{
        el.preventDefault();
        if(el.target.hasAttribute('href')){

            navigation.childNodes.forEach((el)=>{
                el.firstChild.classList.remove('active')
            })

            let linkmarksList =document.getElementById('linkmarksList')
            linkmarksList.innerHTML='';
            console.log(el.target-1);
            appendJsonLinksToHTML(json[el.target.id-1]["linkmarks"],'linkmarksList');
            el.target.classList.add('active')
            window.history.pushState('page'+el.target.id, 'Title'+el.target.id, el.target.href);
        }
    })



  let addNewPageNavigation = document.getElementById('addNewPageNavigation');
  addNewPageNavigation.addEventListener('click',()=>{
      addNewPage();
    })



}
