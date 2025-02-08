class App {
    constructor(parameters) {
        this.log('App is started');
        this.fetchModules();
        this.log('Modules is loaded');
        this.fetchPage();
    }

    clear(){
        this.txtText.textContent = '';
        this.txtKey.textContent = '';
    }

    log(msg){
        console.log('H-Tools> ' + msg);
    }

    fetchModules(){
        this.fetchAndExecute("header", "modules/header.html");
        this.fetchAndExecute("menu", "modules/menu.html");
        this.fetchAndExecute("footer", "modules/footer.html");
    }

    fetchPage(){
        const urlParams = new URLSearchParams(window.location.search);
        const page = urlParams.get("page") ?? "home";
        this.fetchAndExecute("content", "pages/"+page+"/index.html", () => {
            this.loadScript("pages/"+page+"/page.js", () => {
                const page = new Page();
            });
        });
        this.log('App ' + page + ' loaded');
    }

    fetchAndExecute(elementId, url, callback) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                const element = document.getElementById(elementId);
                element.innerHTML = data;
                const scripts = element.getElementsByTagName('script');
                for (let script of scripts) {
                    eval(script.innerHTML);
                }
                if (callback) callback();
            });
    }

    loadScript(url, callback) {
        const script = document.createElement("script");
        script.src = url;
        script.onload = callback;
        document.head.appendChild(script);
    }
}

const app = new App(1);