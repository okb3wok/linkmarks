import {addNewPage} from "./addNewPage.js";

const admin = {

  isAdmin: true,

  addNewPageNavigationHandler() {
    let addNewPageNavigation = document.getElementById('addNewPageNavigation');
    addNewPageNavigation.addEventListener('click',()=>{
      addNewPage();
    })
  }

}
export default admin;
