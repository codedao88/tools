class Aes {
    constructor() {
        app.log('Aes Started');
        this.txtKey = document.getElementById('txtKey');
        this.loadKey();
    }

    loadKey(){
        const urlParams = new URLSearchParams(window.location.search);
        const secretKey = urlParams.get("key") ?? "";
        this.txtKey.textContent = secretKey;
        app.log('Key: ' + secretKey);
    }

}

const  aes = new Aes();