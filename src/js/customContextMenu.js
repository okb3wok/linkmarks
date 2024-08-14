import {addNewBlock} from "./addNewBlock.js";
import {moveBlock} from "./moveBlock.js";
import {renameBlock} from "./renameBlock.js";
import {blockDelete} from "./blockDelete.js";
import {pageEdit} from "./pageEdit.js";
import {pageDelete} from "./pageDelete.js";
import {addNewLink} from "./addNewLink.js";
import {movePage} from "./pageMove.js";
import {editLink} from "./editLink.js";
import {deleteLink} from "./deleteLink.js";
import {userSettings} from "./userSettings.js";


const customContextMenu = {

  context: null,

  init(){

    // запрещаем вызов стандартного меню
    document.oncontextmenu = function() {return false;};

    document.body.addEventListener('mousedown', function(event) {
      //event.preventDefault();

      if (event.which === 3) {
        this.context = event.target;

        function showContextMenu(htmlMenu){
          let contextMenu = document.querySelector('.context-menu');
          if(contextMenu){
            document.querySelector('.context-menu').remove();
          }
          document.body.insertAdjacentHTML('beforeend', '' +
            '<div class="context-menu">' + htmlMenu + '</div>')
          contextMenu = document.querySelector('.context-menu');
          contextMenu.style.cssText = `display: block; top: ${event.pageY}px; left: ${event.pageX}px;`

        }


        if(event.target.classList.contains('active')){
          showContextMenu('<ul>' +
            '<li><a href="#" id="editPage">Редактировать название страницы</a></li>' +
            '<li><a href="#" id="deletePage">Удалить страницу</a></li>' +
            '<li><a href="#" id="movePage">Переместить страницу</a></li>' +
            '<li><a href="#" id="addNewBlock">Добавить новый блок</a></li>' +
            '</ul>');
          }


        if(event.target.classList.contains('linkmarks__block-title') ||
          event.target.classList.contains('linkmarks__block') ){
          showContextMenu('<ul>' +
            '<li><a href="#" id="editBlock">Редактировать название блока</a></li>' +
            '<li><a href="#" id="deleteBlock">Удалить блок</a></li>' +
            '<li><a href="#" id="moveBlock">Переместить блок на другую страницу</a></li>' +
            '<li><a href="#" id="addNewBlock">Добавить новый блок</a></li>' +
            '<li><a href="#" id="addNewLink">Добавить новую ссылку</a></li>' +
            '</ul>');
          }

        if(event.target.parentElement.parentElement.classList.contains('linkmarks__block-links') &&
          !event.target.classList.contains('linkmarks__block-header') ){
          showContextMenu('<ul>' +
            '<li><a href="#" id="editLink">Редактировать ссылку</a></li>' +
            '<li><a href="#" id="deleteLink">Удалить ссылку</a></li>' +
            '</ul>');
        }


        if(event.target.classList.contains('userName')){
          showContextMenu('<ul>' +
            '<li><a href="#" id="userSettings">Настройки</a></li>' +
            '</ul>');
        }

      }else{

        const contextMenu = document.querySelector('.context-menu');

        if (!contextMenu) {
          return;
        }else{
          if(contextMenu.contains(event.target)){
            if(event.target.id==='editPage'){
              pageEdit(this.context);
            }else if(event.target.id==='deletePage'){
              pageDelete(this.context);
            }

            if(event.target.id==='editLink'){
              editLink(this.context);
            }

            if(event.target.id==='userSettings'){
              userSettings();
            }

            if(event.target.id==='deleteLink'){
              deleteLink(this.context);
            }

            if(event.target.id==='addNewBlock'){
               addNewBlock();
            }

            if(event.target.id==='movePage'){
              movePage();
            }

            if(event.target.id==='deleteBlock' ||
              event.target.id==='moveBlock' ||
              event.target.id==='editBlock' ||
              event.target.id==='addNewLink'){

              let block = null;
              if(this.context.classList.contains('linkmarks__block')){
                block = this.context;
              }else if(this.context.parentElement.parentElement.classList.contains('linkmarks__block')){
                block = this.context.parentElement.parentElement;
              }

              if(event.target.id==='deleteBlock'){
                blockDelete(block);
              }else if(event.target.id==='moveBlock'){
                moveBlock(block);
              }else if(event.target.id==='editBlock'){
                renameBlock(block);
              }else if(event.target.id==='addNewLink'){
                addNewLink(block);
              }
            }
          }
        }
        document.querySelector('.context-menu').remove();
      }
    });
  }
}
export default customContextMenu;
