const client = io();
const formLogin = document.forms.formLogin;

formLogin.addEventListener("submit",(e)=>{
    // j'empeche le submit de mon client
    e.preventDefault();
    console.dir(formLogin);
    // je recupere les données du formulaire
    let login = formLogin.login.value;
    let pwd = formLogin.pwd.value;
    client.emit("init",{"login":login,"pwd":pwd})
})
client.on("success",(data)=>{
    console.dir(data);
    window.location = "./chat.html?id="+data.id;
})
