const getDataFromServer= async function (url) {
  let response = await fetch(url);
  if (response.ok) {
    return await response.json();
  }
  else {
    console.log("Ошибка HTTP: " + response.status);
  }
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

  let addNewBlockElement = document.getElementById('addNewBlock');
  addNewBlockElement.onmousedown = () => {
      let newBlock = document.createElement('div');
      newBlock.classList.add("linkmarks__block");
      newBlock.innerHTML='<div class="linkmarks__block-header">' +
        '<h2 class="linkmarks__block-title" ><input type="text" /></h2>' +
        '<div class="linkmarks__block-close">Х</div>' +
        '</div>';
      newBlock.getElementsByClassName('linkmarks__block-close')[0]
        .onmousedown = (event)=> {
        event.target.parentElement.parentElement.remove();
      }
      linkmarks.insertBefore( newBlock,addNewBlockElement);
    }



  Object.values(linkmarks.getElementsByClassName('linkmarks__block-close'))
  .forEach(
    element =>{ element.onmousedown = (event)=> {
      event.target.parentElement.parentElement.remove();
    }}
  )



}



getDataFromServer("links.json").then((result)=>{

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
    block.innerHTML = '<div class="linkmarks__block-grab">______</div><div class="linkmarks__block-header">' +
      '<h2 class="linkmarks__block-title" >' + key + '</h2> <div class="linkmarks__block-close">Х</div>' +
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

























//linkmarks.onmouseover = linkmarks.onmouseout = handler;

/*

const choosingElement = (el) => {
  if(el.target.id !== 'list'){
    console.log(el.target.innerText);
    listElement = el.target;
  }
}

list.onmouseover = choosingElement;




list.onmousedown = () => {

  listElement.style.position='relative';

  list.onMouseMove = (event) => {
    listElement.style.top = event.screenX ;
  };


  list.onmouseover = (event) => {
    listElement.style.top = event.clientX;
  };


}


list.onmouseup = () => {
  console.log('up');

  listElement.onMouseMove = null;  }







list.onclick = (el)=> {


  delta_x = 0;
  block = el.target;

  console.log(el.target.innerText);


  block.onmousedown = saveXY;




  function saveXY(event) {



    block.style.position='relative';
    block.style.top='0px';

    console.log(event);

      y = event.pageY;


    y_block = block.offsetTop;

    delta_y = y_block - y;

    document.onmousemove = moveBlock;

  }


  document.onmouseup = clearXY;

  function clearXY() {
    block.style.position='';
    block.style.top='';
    document.onmousemove = null; // При отпускании мыши убираем обработку события движения мыши
    block = '';
    delta_y=0;
  }


  function moveBlock(obj_event) {

    console.log(obj_event);

    if (obj_event) {

      y = obj_event.pageY;
    }
    else {

      y = window.event.clientY;

    }


    new_y = delta_y + y;
    block.style.top = new_y + "px";

  }

}
*/