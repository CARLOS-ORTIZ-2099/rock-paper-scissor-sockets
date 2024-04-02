// creando un socket 
const socket = io()
const inputValue = document.querySelector('.input-value')
const sendData = document.querySelector('.send-data')
const mainHidden = document.querySelector('.main-hidden')
const charging = document.querySelector('.charging')
const userName = document.querySelector('.user-name')
const rivalName = document.querySelector('.rival-name')
const btnOption = document.querySelectorAll('.btn-option')
let nameUser = ''
//let move = undefined
let player 
let rival

sendData.addEventListener('click', (e) => {
    // cuando el usuario escriba algo ejecutaremos un evento del socket
    if(inputValue.value.trim()!= '') {
        nameUser = inputValue.value
       // console.log(inputValue.value);
        const data = {name : inputValue.value, id: new Date().getTime(), isTurn:true, figure: '' }
        socket.emit('register', data)
        charging.classList.contains('hidden') ? charging.classList.remove('hidden') : ''
    }
    
})


socket.on('showGame', (data) => {
   // console.log(data);
  //  console.log(nameUser);
    setTimeout(() => {
        mainHidden.classList.contains('main-hidden') ? mainHidden.classList.remove('main-hidden') : ''

        !charging.classList.contains('hidden') ? charging.classList.add('hidden') : ''
         
        player = data.user.find(user => user.name == nameUser)
      //  console.log(player);
      //  move = player.isTurn

        rival = data.user.find(user => user.name !== nameUser)
      //  console.log(rival);
        
        userName.innerHTML = `${player.name}`
        rivalName.innerHTML = `${rival.name}`
       // console.log(move);     

    }, 2000)
})


/* let u =  { name : 'name', id :123, turn : true, figure : undefined }
let u1 =  { name : 'name1', id :124, turn : false, figure : undefined } */


btnOption.forEach(btn => btn.addEventListener('click',  chooseOption))
            
      
        
function chooseOption(e) {
    if(player.isTurn) {
      //  console.log(e.target.textContent);
        player.isTurn = false
        player.figure = e.target.textContent
        rival.isTurn = true
        //move = false
        console.log(player);
        socket.emit('changeTurn', {users : [player, rival]})
    }
   
}

socket.on('change', (data) => {
   // console.log(data);
    player = data.find(user => user.id == player.id)
    rival = data.find(user => user.id == rival.id)
   // console.log(player);
   // console.log(rival);
    checkWinner(player, rival)

})


function checkWinner(player, rival) {
    // los casos de triunfo
    // tijera gana papel
    if(player.figure == 'tijera' && rival.figure == 'papel'){
        alert(`ha ganado ${player.name}`)
    }

    else if(rival.figure == 'tijera' && player.figure == 'papel') {
        alert(`ha ganado ${rival.name}`)
    }


    // papel gana piedra
    if(player.figure == 'papel' && rival.figure == 'piedra'){
        alert(`ha ganado ${player.name}`)
    }

    else if(rival.figure == 'papel' && player.figure == 'piedra') {
        alert(`ha ganado ${rival.name}`)
    }


    // piedra gana tijera
    if(player.figure == 'tijera' && rival.figure == 'papel'){
        alert(`ha ganado ${player.name}`)
    }

    else if(rival.figure == 'tijera' && player.figure == 'papel') {
        alert(`ha ganado ${rival.name}`)
    }
    // enpate si ambas figuras son iguales

    if(rival.figure == player.figure ) {
        alert(`se ha empatado`)
    }
    else if(rival.figure == player.figure ) {
        alert(`se ha empatado `)
    }
}

