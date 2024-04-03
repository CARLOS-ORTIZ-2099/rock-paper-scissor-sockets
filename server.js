const http = require('http')
const fs = require('fs')
const {Server}  = require('socket.io')
const colors  = require('colors') 

const server = http.createServer((req, res) => {
   // console.log(req.url);
    if(req.url == '/'){
        const stream = fs.createReadStream('./index.html') 
        stream.pipe(res) 
       // stream.on('end', () => console.log('se termino de leer'))
        stream.on('error', (err) => {
             res.writeHead(404, { 'Content-Type': 'text/plain' });
             res.end(`Error al leer el archivo index: ${err}`);
        });
    }

    if(req.url == '/index.js'){
        const stream = fs.createReadStream('./index.js') 
        stream.pipe(res) 
       // stream.on('end', () => console.log('se termino de leer'))
        stream.on('error', (err) => {
             res.writeHead(404, { 'Content-Type': 'text/plain' });
             res.end(`Error al leer el archivo index: ${err}`);
        });
    }

    if(req.url == '/styles.css'){
        const stream = fs.createReadStream('./styles.css') 
        stream.pipe(res) 
       // stream.on('end', () => console.log('se termino de leer'))
        stream.on('error', (err) => {
             res.writeHead(404, { 'Content-Type': 'text/plain' });
             res.end(`Error al leer el archivo index: ${err}`);
         });
    }
    
})

server.listen(3000, () => console.log('server listening on port 3000'))

// instanciadno la clase socket
const io = new Server(server)
let users = []
// recibiedno como parametro del callback el scoket entrante
io.on('connection', (socket) => {
    console.log('socket conected');
    socket.on('register', (data) => {
       console.log(users.length);
       if(users.length <= 1) {
           users.length > 0 ?  users.push({...data, isTurn : false}) : users.push(data)
        console.log(users);
       }else{
        console.log('no se puede añadir mas '.red);
       }
        
       if(users.length == 2) {
        io.emit('showGame', {user :users})
       }
    })

   socket.on('changeTurn', (data) => {
       console.log(data);
       console.log(users);
       users = data.users
       console.log(users);
       /* 
       let res = users.find(user => user.name === data.name)
       res.isTurn = data.isTurn
       console.log(users); */
       io.emit('change', users)
   })

   socket.on('reset', (data) => {
      users = data.users
      console.log(users);
   })
    

})




/* let u =  { name : 'name', id :123, turn : true, figure : undefined }
let u1 =  { name : 'name1', id :124, turn : false, figure : undefined } */




