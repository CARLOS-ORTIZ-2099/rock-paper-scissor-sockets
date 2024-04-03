// creando un socket 
const socket = io()
const inputValue = document.querySelector('.input-value')
const sendData = document.querySelector('.send-data')
const mainHidden = document.querySelector('.main-hidden')
const charging = document.querySelector('.charging')
const userName = document.querySelector('.user-name')
const turn =document.querySelector('.turn')
const rivalName = document.querySelector('.rival-name')
const btnOption = document.querySelectorAll('.btn-option')
const dataInput = document.querySelector('.data-input')
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
        !dataInput.classList.contains('data-hidden') ? dataInput.classList.add('data-hidden') : ''
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
        
        turn.textContent = player.isTurn ?  player.name : rival.name
        userName.innerHTML = `${player.name}`
        rivalName.innerHTML = `${rival.name}`
       // console.log(move);     

    }, 2000)
})




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
   turn.textContent = player.isTurn ?  player.name : rival.name
   if(player.figure!= '' && rival.figure!= '') {
      checkWinner(player, rival)
      // cuando se encuentre un ganador reseteamos todo
      console.log(player);
      player = {}
      console.log(rival);
      rival = {}
      socket.emit('reset', {users : []})
      mainHidden.classList.add('main-hidden')
      dataInput.classList.remove('data-hidden') 
      inputValue.value = ''
   }
   

})


function checkWinner(player, rival) {
    console.log('entro');
    // los casos de triunfo
    // tijera gana papel
    if(player.figure == 'tijera' && rival.figure == 'papel'){
        alert(`felicidades has ganado ${player.name}, seleccionando ${player.figure} vs ${rival.figure} seleccionado de tu rival ${rival.name}`)
    }

    else if(rival.figure == 'tijera' && player.figure == 'papel') {
        alert(`ha ganado tu rival ${rival.name} con ${rival.figure} vs ${player.figure} que seleccionaste`)
    }


    // papel gana piedra
    if(player.figure == 'papel' && rival.figure == 'piedra'){
        alert(`felicidades has ganado ${player.name}, seleccionando ${player.figure} vs ${rival.figure} seleccionado de tu rival ${rival.name}`)
    }

    else if(rival.figure == 'papel' && player.figure == 'piedra') {
        alert(`ha ganado tu rival ${rival.name} con ${rival.figure} vs ${player.figure} que seleccionaste`)
    }


    // piedra gana tijera
    if(player.figure == 'piedra' && rival.figure == 'tijera'){
        alert(`felicidades has ganado ${player.name}, seleccionando ${player.figure} vs ${rival.figure} seleccionado de tu rival ${rival.name}`)
    }

    else if(rival.figure == 'piedra' && player.figure == 'tijera') {
        alert(`ha ganado tu rival ${rival.name} con ${rival.figure} vs ${player.figure} que seleccionaste`)
    }
    // enpate si ambas figuras son iguales

    if(rival.figure == player.figure ) {
        alert(`se ha empatado con ${player.figure} que seleccionaste vs ${rival.figure} que selecciono tu rival`)
    }
    else if(rival.figure == player.figure ) {
        alert(`se ha empatado con ${player.figure} que seleccionaste vs ${rival.figure} que selecciono tu rival`)
    }
}

