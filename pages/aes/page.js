class Page {
    constructor(pageName) {
        app.log(pageName + ' started');
        this.txtText = document.getElementById('txtText');
        this.txtKey = document.getElementById('txtKey');
        this.txtEncrypt = document.getElementById('txtEncrypt');
        this.lblMessage = document.getElementById('lblMessage');
        this.btnCopy = document.getElementById('btnCopy');
        this.btnReset = document.getElementById('btnReset');
        this.btnCopy.addEventListener('click', this.copy.bind(this));
        this.btnReset.addEventListener('click', this.reset.bind(this));
        this.loadKey();

        // Corrected event type from 'onchange' to 'change'
        this.txtText.addEventListener('change', this.encrypt.bind(this));

        app.loadScript("pages/aes/crypto-aes.js", () => {
            app.log('crypto-aes.js loaded');
        });
    }

    copy() {
        if (this.txtEncrypt.value.trim() === "") {
            this.lblMessage.innerText = "Nội dung trống!";
            return;
        }

        navigator.clipboard.writeText(this.txtEncrypt.value)
            .then(() => {
                this.lblMessage.innerText = "Đã copy thành công!";
            })
            .catch(err => {
                this.lblMessage.innerText = "Lỗi khi copy!";
                app.log("Lỗi: ", err);
            });
    }

    reset() {
        this.txtText.value = "";
        this.txtEncrypt.value = "";
        this.lblMessage.innerText = "";
        navigator.clipboard.writeText("");
    }

    loadKey() {
        const urlParams = new URLSearchParams(window.location.search);
        const secretKey = urlParams.get("key") ?? "";
        this.txtKey.value = secretKey;
        app.log('Key: ' + secretKey);
    }

    encrypt() {
        console.log('encrypt');
        let plaintext = this.txtText.value;
        let secretKey = this.txtKey.value;
        let encrypted = CryptoJS.AES.encrypt(plaintext, secretKey).toString();
        this.txtEncrypt.value = encrypted;
        this.txtEncrypt.style.height = "auto"; // Reset chiều cao về auto trước khi đo
        this.txtEncrypt.style.height = this.txtEncrypt.scrollHeight + "px"; // Đặt chiều cao theo nội dung
    }

    decrypt() {
        let ciphertext = document.getElementById("ciphertext").value;
        let secretKey = this.txtKey.value;
        let decrypted = CryptoJS.AES.decrypt(ciphertext, secretKey).toString(CryptoJS.enc.Utf8);
        document.getElementById("decryptedText").innerText = decrypted;
    }
}