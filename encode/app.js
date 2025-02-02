class App {
    constructor(parameters) {
        
        // Init 
        this.btnProcess = document.getElementById('btnProcess');
        this.btnHello = document.getElementById('btnHello');
        this.btnClear = document.getElementById('btnClear');
        this.txtText = document.getElementById('txtText');
        this.txtKey = document.getElementById('txtKey');
        

        // Add event
        this.btnHello.addEventListener('click', this.hello.bind(this));
        this.btnProcess.addEventListener('click', this.hello.bind(this));
        this.btnClear.addEventListener('click', this.clear.bind(this));
    }

    hello(){
        alert('Hello');
    }

    clear(){
        this.txtText.textContent = '';
        this.txtKey.textContent = '';
    }

}

const  app = new App(1);