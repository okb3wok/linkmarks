
let linkmarks = document.getElementById("linkmarks");


linkmarksBlocks = Object.values(linkmarks.children);

let elCount=1;
linkmarksBlocks.forEach(element => {
  element.id = "block_" +elCount;
  elCount++;
})


linkmarks.onmouseover = (pointingObj) => {

  console.log(pointingObj.target.getBoundingClientRect());

}








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