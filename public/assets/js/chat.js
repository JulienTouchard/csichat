const client = io();
const sendMessage = document.querySelector("#sendMessage");
const displayMessages = document.querySelector("#displayMessages");
let urlParams =  new URLSearchParams(window.location.search);
const quill = new Quill('#editor', {
    theme: 'snow'
  });
// récupération des meqssages du server 
client.emit("getMessages",{})
client.on("sendGlobalMessages",(data)=>{
    // je récupere à la connexion tous les messages du serveur
    console.dir(data);
    // je lance une boucle qui devra créer dans le DOM autant d'élements
    // que de messages
    data.data.messages.forEach(element => {
        //... creation de mes messages
        /* <div class="list-group-item list-group-item-action flex-column align-items-start">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">List group item heading</h5>
                        <small>3 days ago</small>
                    </div>
                    <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus
                        varius blandit.</p>
                </div> */
    });

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
