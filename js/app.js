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
        document.getElementById("header").innerHTML = fetch("modules/header.html").then(response => response.text()).then(data => document.getElementById("header").innerHTML = data);
        document.getElementById("menu").innerHTML = fetch("modules/menu.html").then(response => response.text()).then(data => document.getElementById("menu").innerHTML = data);
        document.getElementById("footer").innerHTML = fetch("modules/footer.html").then(response => response.text()).then(data => document.getElementById("footer").innerHTML = data);
    }

    fetchPage(){
        const urlParams = new URLSearchParams(window.location.search);
        const page = urlParams.get("page") ?? "home";
        this.fetchAndExecute("content", "pages/"+page+"/index.html");
        //document.getElementById("content").innerHTML = fetch("pages/"+page+"/index.html").then(response => response.text()).then(data => document.getElementById("content").innerHTML = data);
        this.log('App ' + page + ' loaded');
    }

    fetchAndExecute(elementId, url) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                const element = document.getElementById(elementId);
                element.innerHTML = data;
                const scripts = element.getElementsByTagName('script');
                for (let script of scripts) {
                    eval(script.innerHTML);
                }
            });
    }

}

const  app = new App(1);