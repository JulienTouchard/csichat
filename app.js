// pour creer mon projet 
// j'utilise dans mon terminal la commande npm init

// une fois le node_modules créé pensez a créer dans votre projet
// un .gitignore pour exclure ce dossier

// installation express npm i express
// ce module express sera chargé de la distribuer le fichier index.html
// auprès de mes clients
const express = require('express');
// import du module http (dejà present avec express) pour effectuer entre
// mon serveur et mes clients les requetes HTTP
const http = require('http');
const fs = require('fs');
const app = express();
const hostname = '127.0.0.1';
const port = 8000;
const server = http.Server(app);
const io = require('socket.io')(server);
let userLogins;
fs.readFile("./data/user.json", (err, txt) => {
    console.dir(err);
    userLogins = JSON.parse(txt);
    console.dir(userLogins);


});

io.on('connection', client => {
    client.on('init', data => {
        userLogins.user.forEach(element => {
            if (element.login === data.login && element.pwd === data.pwd) {
                client.emit("success", { "id": client.id })
            }

        });
        // j'ai besoin d'acceder à user.json confronter mes log et pwd
    });
    client.on("newMessage", (data) => {
        let tmpMessages;
        fs.readFile("./data/messages.json", (err, dataMsg) => {
            console.log("error : " + err);
            tmpMessages = JSON.parse(dataMsg);
            tmpMessages.messages.push(data);
            console.dir(tmpMessages);
            fs.writeFile("./data/messages.json", JSON.stringify(tmpMessages), (err) => {
                console.dir(err);
            })
        })
    })

    client.on('disconnect', () => { /* … */ });
});
// dans le but cloisonner mon application coté serveur et les ressources
// destinées à mes clients je crée un dossier public ou www
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
})



server.listen(port, hostname, () => {
    console.log(`serveur runing http://${hostname}:${port}`);
})

// pour lancer mon seveur :
// node --watch app.js
