let resultElement = document.querySelector('.result')
let mainContainer = document.querySelector('.main-container');
let rowId = 1;

//Petición al API de palabras

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'a036c25fa4msh6d90b846bf04fe2p13bf08jsn3d8b149e47ff',
		'X-RapidAPI-Host': '1000-most-common-words.p.rapidapi.com'
	}
};

fetch('https://palabras-aleatorias-public-api.herokuapp.com/random', options)
.then(result => result.json())
.finally(()=>{
    let loadingElement = document.querySelector('.loading')
    loadingElement.style.display = 'none';
})
.then(data => {
    let word = data[0];
let wordArray = word.toUpperCase().split('')
console.log(wordArray)

let actualRow = document.querySelector('.row')

drawSquares(actualRow);
listenInput(actualRow);

addfocus(actualRow)

function listenInput(actualRow){
    let squares = actualRow.querySelectorAll('.square');
    squares = [...squares];
    
    let userInput = []
    
    squares.forEach(element =>{
        element.addEventListener('input', event=>{
        //Si no se ha borrado
        if(event.inputType !== 'deleteContentBackward'){
        //Recoger el ingreso del usuario
                userInput.push(event.target.value.toUpperCase())
                console.log(userInput)
                if(event.target.nextElementSibling){
                    event.target.nextElementSibling.focus();
                }else {
                    
                    //Crear el arreglo con las letras

                    //Buscar el contenido de la fila anterior 
                    //Armar un arreglo con el resultado antes de comparar

                    let squaresFilled = document.querySelectorAll('.square')
                    squaresFilled = [...squaresFilled]
                    let lastFiveSquaresFilled = squaresFilled.slice(-word.lenght);
                    let finalUserInput = [];
                    lastFiveSquaresFilled.forEach(element =>{
                        finalUserInput.push(element.value.toUpperCase());
                    });
                     //Cambiar estilos si existe la letra pero no está en la posición correcta
                    let existIndexArray = existLetter(wordArray, userInput)
                    console.log(existIndexArray)
                     existIndexArray.forEach(element =>{

                         squares[element].classList.add('gold');
                    });
                    //Comparar arreglos para cambiar estilos
                    let rightIndex = compareArrays(wordArray, userInput)
                    console.log(rightIndex)
                    rightIndex.forEach(element =>{
                        squares[element].classList.add('green');
                     })
                    //Si los arreglos son iguales
                    if(rightIndex.length == wordArray.length){
                        showResult('Ganaste!')                           
                        return;
                     }      
                    //Crear una nueva fila
                    let actualRow = createRow()

                        if(!actualRow){
                        return;
                    }
                        drawSquares(actualRow)
                        listenInput(actualRow)
                        addfocus(actualRow)                            
                    }   
                }else{
                    userInput.pop();
                }
                    console.log(userInput)
              }); 
            })
        }                         
            
            
            

//FUNCIONES 

function compareArrays(array1, array2){
    let iqualsIndex = []
    array1.forEach((element, index)=>{
        if(element == array2[index]){
            console.log(`En la posición ${index} si son iguales`);
            iqualsIndex.push(index);
        }else{
            console.log(`En la posición ${index} NO son iguales`);
        }
    });
    return iqualsIndex;
}

function existLetter(array1, array2){
    let existIndexArray = [];
    array2.forEach((element, index)=>{
        if(array1.includes(element)){
            existIndexArray.push(index)
        }
    });
    return existIndexArray;
}

function createRow(){
    rowId++
    if(rowId <= 7){
    let newRow = document.createElement('div');
    newRow.classList.add('row');
    newRow.setAttribute('id', rowId)
    mainContainer.appendChild(newRow)
    return newRow;
    }else{
    showResult(`Intenta de nuevo! La respuesta correcta era "${word.toUpperCase()}"`)
}
}

function drawSquares(actualRow){
    wordArray.forEach((item, index) => {
        if (index === 0) {
            actualRow.innerHTML += `<input type="text" maxlength="1" class="square focus">`
            }else{
            actualRow.innerHTML += `<input type="text" maxlength="1" class="square">`
        }
    });
}    
        
function addfocus(actualRow){
    let focusElement = actualRow.querySelector('.focus')
    console.log(focusElement)
    focusElement.focus();

}

function showResult(textMsg){
    resultElement.innerHTML = `<p>${textMsg}</p>
    <button class="button">Reiniciar</button>`

    let resetBtn = document.querySelector('.button')
    resetBtn.addEventListener('click', ()=>{
    location.reload();
});
}
});


