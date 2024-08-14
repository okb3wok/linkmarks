export const modal ={

    modal:null,
  
    init(){

        this.modal = document.getElementById('modal');

        if(!this.modal){
            console.log('Can`t find element #modal');
            return;
        }

        this.modal.addEventListener('click',(evnt)=>{
            let modalContainer = document.querySelector('.modal__container');
            if(modalContainer.contains(evnt.target)){
            }else{
                this.hide();
            }
        })

        let modalClose=document.getElementById('modalClose');
        modalClose.addEventListener('click', (evnt)=>{
            this.hide();
        })
    },

    show(){
        this.modal.classList.remove('fade');
    },

    content(html){
        this.modal.querySelector('.modal__content').innerHTML = html;
    },

    hide(){
        this.modal.classList.add('fade');
        setTimeout(() => {
            this.content('');
        }, "400");
    }
}
