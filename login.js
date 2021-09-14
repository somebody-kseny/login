'use strict';

class Button {
    elem = document.createElement('button');
    constructor(text, styleClass, id, form){
        this.elem.id = id;
        this.elem.innerHTML = text;
        this.elem.classList.add(styleClass);
        this.elem.addEventListener("click", form);
    }
}

class Input {
    divLine = document.createElement('div');
    div = document.createElement('div');
    elem = document.createElement('input');
    p = null;
    constructor(type, name, styleClass){
        this.elem.id = type;
        this.elem.type = type;
        this.elem.name = name;
        this.elem.placeholder = name;
        this.elem.classList.add(styleClass);

        this.elem.addEventListener("focusin", this);

        this.divLine.classList.add('line');
        this.divLine.appendChild(this.elem);
        this.div.appendChild(this.divLine);
    }
    setError(str){
        
        this.p = document.createElement('span');
        this.p.classList.add("errStr")
        this.p.innerHTML = str;

        this.div.appendChild(this.p);
        this.div.classList.add("err");
    }
    handleEvent(event) {
        switch(event.type) {
            case 'focusin':
                if (this.p !== null) {
                    this.div.removeChild(this.p);
                    this.p = null;
                }
                break; 
        } 
    }
    clearErrors(){
        // убрать картинку с восклицательныи знаком!!!!!!
        if (this.p !== null) {
            this.div.removeChild(this.p);
        }
        this.div.classList.remove("err");
    }
}

class LoginForm {
    div = document.createElement("div");
    elem = document.createElement("form");
    button = new Button("Войти", "startBtn", "login", this);
    emailInput = new Input("email", "E-mail", "startInput");
    pswdInput = new Input("password", "password", "startInput");
    inputs = [this.emailInput, this.pswdInput];
    constructor(){
        this.elem.method = "POST";
        this.elem.classList.add = "startForm";

        this.emailInput.autofocus = true;

        this.div.classList.add("startForm");

        this.div.appendChild(this.elem);
        this.elem.appendChild(this.emailInput.div);
        this.elem.appendChild(this.pswdInput.div);
        this.elem.appendChild(this.button.elem);
    }
    handleEvent(event) {
        switch(event.type) {
            case 'click':
                event.preventDefault();
                this.inputs.forEach((input) => {
                    input.clearErrors();
                });
                this.checkForm();
                break; 
        } 
    }
    checkForm(){
        let isOk = true
        let error = "";
        const email = this.emailInput.elem.value.trim();
        const pswd = this.pswdInput.elem.value;

        if (email === "") {
            this.emailInput.setError("Введите адрес электронной почты");
        } else if ( email.match(/\S+@\S+\.\S+/) === null ) {
            this.emailInput.setError("Это не может быть адресом электронной почты");
        }
        if ( pswd === "" ) {
            this.pswdInput.setError("Введите пароль");
        }
        console.log(email, pswd);
        // отправка куда-то, наверное...
    }
    showResponse(code){
        if (code === 404) {
            this.emailInput.setError("Не зарегистрирован такой адрес электронной почты");
        } else if (code === 400) {
            this.pswdInput.setError("Неверный пароль");
        } else {
            console.log("?! showResponse(" + code + ")")
        }
    }
}

const main = () => {
    const root = document.getElementById('root');
    root.innerHTML = '';
    let form = new LoginForm("lover");
    root.appendChild(form.div);
    form.showResponse(404);
}

main();