import {api} from "./api.js";
import {API_URL} from "./const.js";


const authorization = {

  authForm: null,
  authInput: null,
  pinCode: [],

  init(user){
    this.authForm = document.getElementById('authForm');
    if(!this.authForm){
      console.log('Can`t find element #authForm');
      return;
    }
    this.authInput = this.authForm.querySelector('input');
    this.authForm.addEventListener('click', () => {

      this.authInput.focus();
      this.update();
    })

    document.querySelector('.authorization').addEventListener('click',el=>{

      if(!this.authForm.contains(el.target)){
        this.cleanCells();
      }
    })

    this.authInput.addEventListener('keydown', event=>{
      if(event.key === 'Backspace' || event.key === 'Delete'){
        this.pinCode = this.pinCode.slice(0, this.pinCode.length - 1)
        this.update();
      }else {
        if(parseInt(event.key)){
          if(this.pinCode.length < 4){
            this.pinCode.push(event.key);
            this.update();
             if(this.pinCode.length === 4){
               console.log('ReadyToCheck!')
               console.log(this.pinCode)

               let request = {
                 data: {
                   method:"auth",
                   cod: this.pinCode.join('')
                 }
               }

               api(API_URL,'POST', request).then((result)=> {

                 if(result.result){
                   document.querySelector('.authorization').remove();
                 }else {
                   this.pinCode = [];
                   this.update();
                   this.authForm.querySelector('.code').classList.add('invalid')
                   this.authForm.querySelectorAll('.cell').forEach(el=>{
                     el.classList.remove('filled')
                     el.classList.add('invalid');
                   })
                 }
               })





             }
          }
        }
      }
    })
  },

  cleanCells(){
    this.authForm.querySelectorAll('.cell').forEach(el=>{
      el.classList.remove('active');
      el.classList.remove('invalid');
    })
  },


  update(){
    this.authForm.querySelector('.code').classList.remove('invalid')
    let cells = this.authForm.querySelectorAll('.cell');
    for (let i = 0; i < 4; i++) {
      if(this.pinCode[i]){
        cells[i].innerHTML = '<div class="cell-content"></div>';
        cells[i].classList.remove('active')
        cells[i].classList.add('filled')
      }else{
        cells[i].innerHTML = '';
        cells[i].classList.remove('active')
      }
    }
    if(this.pinCode.length<4){
      cells[this.pinCode.length].classList.add('active')
    }
  },


  showForm(){
    document.body.insertAdjacentHTML('beforeend','<div class="authorization"><div class="authorization_form" id="authForm">\n' +
      '  <p class="description">Введите код-пароль для входа</p>\n' +
      '  <div class="code">\n' +
      '    <div class="cell"></div>\n' +
      '    <div class="cell"></div>\n' +
      '    <div class="cell"></div>\n' +
      '    <div class="cell"></div>\n' +
      '  </div>\n' +
      '  <input type="text" inputmode="numeric" class="hidden">\n' +
      '  <div class="error-slot hidden">Неверный код-пароль</div>\n' +
      '  <div class="dont-remember">\n' +
      '    <a href="./#resetPin">\n' +
      '      <span class="dont-remember_text">Не помню пароль</span>\n' +
      '    </a>\n' +
      '  </div>\n' +
      '  </div></div>');
  }


}
export default authorization;
