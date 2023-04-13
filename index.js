
//
//  Функция отправки POST запроса на сервер API
//
async function sendPostToServ (url, request) {
  let response = await fetch(
    url, {
      method: 'POST',
      headers: {'Content-Type': 'text/plain;charset=utf-8'},
      body: JSON.stringify(request)
    });
  return await response.json();
}



let linkmarks = document.getElementById("linkmarks");

linkmarks.classList.add("linkmarks");


let linkmarksJSON={};




const mainFunc = () => {


  document.onmousedown = (pointingObj) => {
    let coords = pointingObj.target.getBoundingClientRect();
    if(pointingObj.target.className==='linkmarks__block') {

      pointingObj.target.style.border = "1px dotted red";
      pointingObj.target.style.zIndex = "-123123";

    }
  }

  document.onmouseup = (pointingObj) => {pointingObj.target.style='';}
  document.onmouseout = (pointingObj) => {pointingObj.target.style='';}





  let rerender=()=>{

    document.getElementById('linkmarks').innerHTML='';
    linkmarksJSON = JSON.parse(localStorage.linkmarks);

    let key=undefined;
    for (key in linkmarksJSON) {

      let blockLinksString ='<ul class="linkmarks__block-links" >';
      linkmarksJSON[key].forEach(el => {

        let url = new URL(el.url);

        blockLinksString = blockLinksString + '<li>' +
          '<a href="' + el.url + '" target="_blank"><img src="'+url.protocol+'//'+url.host+'/favicon.ico" alt="">'+el.title+'</a>' +
          '</li>';
      });


      blockLinksString = blockLinksString + '</ul>';

      let block = document.createElement("div");
      block.classList.add("linkmarks__block");
      block.innerHTML = '<div class="linkmarks__block-grab">______</div><div class="linkmarks__block-header">' +
        '<h2 class="linkmarks__block-title" >' + key + '</h2><div class="linkmarks__block-addlink">+</div><div class="linkmarks__block-close">Х</div>' +
        '</div>' + blockLinksString;


      linkmarks.appendChild(block);
    }

    let addBlock = document.createElement("div");
    addBlock.classList.add("linkmarks__addNew");
    addBlock.innerHTML='+ Добавить блок';
    addBlock.id='addNewBlock';
    linkmarks.appendChild(addBlock);


  }

  addTitleNewBlock = (obj) =>{


    const request = {
      data: {
        method:"addNewCategory",
        newcategory: obj.previousSibling.value
      }
    }



    const url = 'https://hosteria.ru/linkmarks/api.php';
    sendPostToServ(url,request).then(result => {

      console.log(result);

    });
    linkmarksJSON[obj.previousSibling.value]=[];
    localStorage.linkmarks = JSON.stringify(linkmarksJSON);

    rerender();
  }

  closeModal=()=>{
    document.getElementById('modal').style.display='none';

  }

  showModal =(event)=>{


    category=event.target.parentElement.previousSibling.textContent;
    document.getElementById('modal').style.display='block';

  }


  let category ='';

  addlink =()=>{
    let newLinkObj = {
      url:document.getElementById('modalURL').value,
      title:document.getElementById('modalTitle').value
    }
    linkmarksJSON[category].push(newLinkObj);
    localStorage.linkmarks = JSON.stringify(linkmarksJSON);

    const request = {
      data: {
        method:"addLink",
        category: category,
        url: document.getElementById('modalURL').value,
        title: document.getElementById('modalTitle').value
      }
    }


    const url = 'https://hosteria.ru/linkmarks/api.php';
    sendPostToServ(url,request).then(result => {

      console.log(result);


    });

    rerender();
    closeModal();
  }








  let addNewBlockElement = document.getElementById('addNewBlock');
  addNewBlockElement.onmousedown = () => {
      let newBlock = document.createElement('div');
      newBlock.classList.add("linkmarks__block");
      newBlock.innerHTML='<div class="linkmarks__block-header">' +
        '<h2 class="linkmarks__block-title" ><input type="text" /><button onclick="addTitleNewBlock(this)">Ок</button></h2>' +
        '<div class="linkmarks__block-close"><img src="delete.svg" alt="Удалить" class="icons"></div>' +
        '</div>';
      newBlock.getElementsByClassName('linkmarks__block-close')[0]
        .onmousedown = (event)=> {

        event.target.parentElement.parentElement.parentElement.remove();

      }
      linkmarks.insertBefore( newBlock,addNewBlockElement);
    }



  Object.values(linkmarks.getElementsByClassName('linkmarks__block-close'))
  .forEach(
    element =>{ element.onmousedown = (event)=> {





      const request = {
        data: {
          method:"deleteCategory",
          category: event.target.parentElement.previousSibling.previousSibling.innerText
        }
      }


      const url = 'https://hosteria.ru/linkmarks/api.php';
      sendPostToServ(url,request).then(result => {

        console.log(result);

        //TODO нужно метод к апи для удаления блока
        delete linkmarksJSON[event.target.parentElement.previousSibling.previousSibling.innerText];
        event.target.parentElement.parentElement.parentElement.remove();

      });



    }}
  )

  Object.values(linkmarks.getElementsByClassName('linkmarks__block-addlink'))
  .forEach(
    element =>{ element.onmousedown = (event)=> {
      showModal(event);
    }}
  )



}



request = {
  data: {
    method:"fetchLinks"
  }
}


const url = 'https://hosteria.ru/linkmarks/api.php';

sendPostToServ(url,request).then((result)=>{

  linkmarksJSON = result;
  localStorage.linkmarks = JSON.stringify(result);

  let key=undefined;
  for (key in linkmarksJSON) {

    let blockLinksString ='<ul class="linkmarks__block-links" >';
    linkmarksJSON[key].forEach(el => {

      let url = new URL(el.url);

      blockLinksString = blockLinksString + '<li>' +
        '<a href="' + el.url + '" target="_blank"><img src="'+url.protocol+'//'+url.host+'/favicon.ico" alt="">'+el.title+'</a>' +
        '</li>';
      });


    blockLinksString = blockLinksString + '</ul>';

    let block = document.createElement("div");
    block.classList.add("linkmarks__block");
    block.innerHTML = '<div class="linkmarks__block-header">' +
      '<h2 class="linkmarks__block-title" >' + key + '</h2><div class="linkmarks__block-addlink"><img src="add.svg" alt="Добавить" class="icons"></div><div class="linkmarks__block-close"><img src="delete.svg" alt="Удалить" class="icons"></div>' +
      '</div>' + blockLinksString;


    linkmarks.appendChild(block);
  }

  let addBlock = document.createElement("div");
  addBlock.classList.add("linkmarks__addNew");
  addBlock.innerHTML='+ Добавить блок';
  addBlock.id='addNewBlock';
  linkmarks.appendChild(addBlock);
  return linkmarks;
}).then(mainFunc)


document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', '<div class="dm-overlay" id="modal">\n' +
  '    <div class="dm-table">' +
  '        <div class="dm-cell">' +
  '            <div class="dm-modal">' +
  '                <button onclick="closeModal()" class="close">Х</button>' +
  '                <h3>Добавить новую закладку</h3>' +
  '                 <p><label>URL:</label><br><input id="modalURL"/></p>' +
  '                 <p><label>Описание:</label><br> <input id="modalTitle"/></p>' +
  '            <button onclick="addlink()" class="ok">ОК</button></div>' +
  '        </div>' +
  '    </div>' +
  '</div>')