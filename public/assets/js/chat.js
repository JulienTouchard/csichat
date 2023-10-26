const client = io();
const sendMessage = document.querySelector("#sendMessage");
let urlParams =  new URLSearchParams(window.location.search);
const quill = new Quill('#editor', {
    theme: 'snow'
  });
sendMessage.addEventListener("click",()=>{
    let texte = quill.getText();
    let date = new Date();
    console.dir(urlParams);
    let id = urlParams.get('id');
    client.emit('newMessage',{
        "id": id,
        "texte":texte,
        "date":date
    })
})
client.on("newGlobalMessage",(data)=>{
    console.dir(data);
})
