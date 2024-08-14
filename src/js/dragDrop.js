import {updateJson} from "./updateJson.js";
export function dragDrop() {

    let listNode = document.getElementById('linkmarksList');

    for (const block of listNode.childNodes) {
        block.draggable = true;

        let  ul = block.querySelector('ul');

        for (const li of ul.childNodes) {
            li.draggable = true;
        }



        ul.addEventListener(`dragover`, (evt) => {
            evt.preventDefault();
            const activeElement = listNode.querySelector(`.selected`);
            const currentElement = evt.target.parentNode;

            const isMoveable = activeElement !== currentElement &&
                currentElement.localName==='li';

            if (!isMoveable) {
                return;
            }

            const nextElement = (currentElement === activeElement.nextElementSibling) ?
                currentElement.nextElementSibling :
                currentElement;

            currentElement.parentNode.insertBefore(activeElement, nextElement);

        });



    }

    listNode.addEventListener(`dragstart`, (evt) => {
        if(evt.target.parentNode.localName==='li'){
            evt.target.parentNode.classList.add(`selected`);
            // evt.target.parentElement.parentElement.insertAdjacentHTML('beforebegin',
            //     '<div class="trashbin">корзина</div>')
            //
            //
            // evt.target.parentElement.parentElement.parentElement.querySelector('.trashbin').addEventListener("drop", (event) => {
            //
            //     listNode.querySelector(`.selected`).remove();
            //     updateJson();
            //
            // });

        }else{
            evt.target.classList.add(`selected`);
        }


    });




    const handleDragEnd = (evt) =>{
        if(evt.target.parentNode.localName==='li'){
            evt.target.parentNode.classList.remove(`selected`);
            //evt.target.parentElement.parentElement.parentElement.querySelector('.trashbin').remove()

        }else{
            evt.target.classList.remove(`selected`);
        }

        updateJson();

    }


    listNode.addEventListener(`dragend`, handleDragEnd);


    listNode.addEventListener(`dragover`, (evt) => {
        evt.preventDefault();
        const activeElement = listNode.querySelector(`.selected`);
        const currentElement = evt.target;
        const isMoveable = activeElement !== currentElement &&
            currentElement.classList.contains(`linkmarks__block`);


        if (!isMoveable ) {
            return;
        }

        const nextElement = (currentElement === activeElement.nextElementSibling) ?
            currentElement.nextElementSibling :
            currentElement;




        listNode.insertBefore(activeElement, nextElement);


    });


}
