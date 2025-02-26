let input = document.createElement('input') // создаём поле для очков
document.body.appendChild(input) // добавляем в body
// задаём стили полю
input.style.cssText = ` 
    margin: auto;
    margin-bottom: 40px;
    font-size: 16px;
    display: block;`

let button = document.createElement('button') // создаём кнопку
    button.setAttribute('type', 'button')
    button.classList.add('btn')
    button.textContent = 'Начать игру'

let score = 0 // переменная для подсчёта очкров
input.value = `Ваши очки: ${score}` // результат очков

let fild = document.createElement('div')// создаём основной элемент div (поле)
document.body.appendChild(fild)//  добавляем его в конец блока body
fild.classList.add('field')// задаём ему класс(вкорором прописаны стили)

for(let i = 1; i < 101; i++){ // цикл по колличеству кубиков в блоку
    let excel = document.createElement('div') // создаёмэлемент div (маленькие поля)
    fild.appendChild(excel) // добавляем их в конец основного блока div (в поле)
    excel.classList.add('excel') // задаём ему класс(вкорором прописаны стили)
}

let excel = document.getElementsByClassName('excel'), // находим все элементы с заданным классом
    x = 1, // значение по оси х
    y = 10 // значение по оси у

for(let i = 0; i < excel.length; i++){ // проходим циклом, пока не кончатся маленькие поля
    if(x > 10){ // если значение х доходит до противоположной стороны основного блока
        x=1 // то задаём значение с единици
        y-- // 
    }
    excel[i].setAttribute('posX', x) // 
    excel[i].setAttribute('posY', y) // 
    x++
}
// 
function generateSnae() { // выдаёт два случайных значения Х и У (о 1 до 10)
    let posX = Math.round(Math.random() * (10 - 3) + 3)
    let posY = Math.round(Math.random() * (10 - 1) + 1)
    return [posX, posY] // возвращаем массив случайных значения Х и У
}

let coordinates = generateSnae()

// находим два div с указанными координатами Х и У (тело змеи)
let snakeBody = [document.querySelector(`[posX = "5"][posY = "5"]`),
document.querySelector(`[posX = "4"][posY = "5"]`)]
// let snakeBody = [document.querySelector(`[posX = "` + coordinates[0] + `"][posY = "` + coordinates[1] + `"]`),
// document.querySelector(`[posX = "` + (coordinates[0]-1) + `"][posY = "` + coordinates[1] + `"]`)]

for(let i = 0; i < snakeBody.length; i++){ // циклом проходим по длинне тела змеи
    snakeBody[i].classList.add('snakeBody') // задаём класс для тела
}
snakeBody[0].classList.add('head') // задаём класс для головы (индекс 0)

let mouse
function createMouse() {
    function generateMouse() { // выдаёт два случайных значения Х и У (о 1 до 10)
        let posX = Math.round(Math.random() * (10 - 3) + 3)
        let posY = Math.round(Math.random() * (10 - 1) + 1)
        return [posX, posY] // возвращаем массив случайных значения Х и У
    }
let mouseCoordinates = generateMouse()
// ищим блок с указаннымс координатами для яблока
mouse = document.querySelector(`[posX = "` + mouseCoordinates[0] + `"][posY = "` + mouseCoordinates[1] + `"]`)
// если яблоко попадает на тело (класс) змеи, вызываем функцию изменения координат этого яблока
// для того что бы яблоко не попадало на тело змеи 
while (mouse.classList.contains('snakeBody')) { // если координата имеет класс snakeBody
    let mouseCoordinates = generateMouse()
// ищим блок с указаннымс координатами для яблока
mouse = document.querySelector(`[posX = "` + mouseCoordinates[0] + `"][posY = "` + mouseCoordinates[1] + `"]`)
}
mouse.classList.add('mouse') // задаём класс для яблока
// console.log(mouseCoordinates)
}

createMouse()

let direction = 'right'
let steps = false

// функция движения змеи
function move() {
    // находим координаты головы (по индексу 0)
    let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')]
    snakeBody[0].classList.remove('head') // удаляем класс головы змеи
    snakeBody[snakeBody.length-1].classList.remove('snakeBody') // удаляем класс у последнего (хвостового) элемента змеи
    snakeBody.pop() // удаляет из массива последний элемент и возвращает значение удалённого элемента

    // условия движения змеи (меняем значения координат по оси Х (лево, право) и по оси У (верх, низ))
if(direction == 'right'){
    // учим змею выходить с левого края блока
    if(snakeCoordinates[0] < 10){ // если у головы координата меньше 10 (не дошла до края блока), то
        snakeBody.unshift(document.querySelector(`[posX = "` + (+snakeCoordinates[0]+1) + `"][posY = "` + snakeCoordinates[1] + `"]`))
    } else { // если у головы координата 10 (упёрлась в стену блока), то posX = "1"
        // тем голова начинает двигаться опять с первой координаты по линии Х 
    snakeBody.unshift(document.querySelector(`[posX = "1"][posY = "` + snakeCoordinates[1] + `"]`))
    }
} else if(direction == 'left'){ // если змея движется с левого края, то
    // учим змею выходить с правого края блока
    if(snakeCoordinates[0] > 1){ // если у головы координата больше 1 (не дошла до края блока), то
        snakeBody.unshift(document.querySelector(`[posX = "` + (+snakeCoordinates[0]-1) + `"][posY = "` + snakeCoordinates[1] + `"]`))
    } else { // если у головы координата 1 (упёрлась в левую стену блока), то posX = "10"
        // тем голова начинает двигаться опять с последней координаты по линии Х 
    snakeBody.unshift(document.querySelector(`[posX = "10"][posY = "` + snakeCoordinates[1] + `"]`))
    }
} else if(direction == 'up'){ // если змея движется с вниз, то
    // учим змею выходить с верхнего края блока
    if(snakeCoordinates[1] < 10){ // если у головы координата меньше 10 (не дошла до края блока), то
        snakeBody.unshift(document.querySelector(`[posX = "` + snakeCoordinates[0] + `"][posY = "` + (+snakeCoordinates[1]+1) + `"]`))
    } else { // если у головы координата 10 (упёрлась в нижнюю стену блока), то posУ = "1"
        // тем голова начинает двигаться опять с первой координаты по линии У 
    snakeBody.unshift(document.querySelector(`[posX = "` + snakeCoordinates[0] + `"][posY = "1"]`))
    }
}  else if(direction == 'down'){
    if(snakeCoordinates[1] > 1){
        snakeBody.unshift(document.querySelector(`[posX = "` + snakeCoordinates[0] + `"][posY = "` + (snakeCoordinates[1]-1) + `"]`))
    } else {
    snakeBody.unshift(document.querySelector(`[posX = "` + snakeCoordinates[0] + `"][posY = "10"]`))
    }
}

// если координаты змеи и яблока совпадают (по оси Х и У), то
if(snakeBody[0].getAttribute('posX') == mouse.getAttribute('posX') && snakeBody[0].getAttribute('posY') == mouse.getAttribute('posY')){
    mouse.classList.remove('mouse') // удаляем класс
    let a = snakeBody[snakeBody.length-1].getAttribute('posX')
    let b = snakeBody[snakeBody.length-1].getAttribute('posY')
    // добавляем элемент в конец массива и возвращает новую длину массива
    snakeBody.push(document.querySelector(`[posX = "` + a + `"][posY = "` + b + `"]`))
    createMouse()
    score++ // подсчёт очков
    input.value = `Ваши очки: ${score}` // результат очков
}

// если у головы появится класс который присвоен телу, это значит змея воткнулась в своё тело
if(snakeBody[0].classList.contains('snakeBody')){
// setTimeout(() => {
//   alert("Игра окончина!")  
// }, 200)
document.body.appendChild(button) // добавляем кнопку
    clearInterval(interval)// останавливаем (чистим) функцию движения змеи
    snakeBody[0].style.background ='red'// задаём красный стиль голове змии
}
    snakeBody[0].classList.add('head') // снова задём класс головы змеи
    for(let i = 0; i < snakeBody.length; i++){ // циклом проходим по длинне тела змеи
        snakeBody[i].classList.add('snakeBody') // задаём класс для тела
    }
    steps = true
}


let interval = ''
// 
let body = document.querySelector('body') // при клике по экрану () запускается игра
body.addEventListener('click', function() {
// задаём интервал вызова функции движения змеи в 0.5 сек
interval = setInterval(move, 500)
})
// let interval = setInterval(move, 500)







// отслеживаем событие нажатия клавиш управления
window.addEventListener('keydown', function(e){
    if(steps == true){ // пока змейка не сделает один ход, кнопки реагировать не будут
        // для того чтоб небыло двух нажатий кнопки в один ход змейки
        if(e.keyCode == 37 && direction != 'right'){ // влево и запрещаем движение в противоположную сторону
            // то есть если дижется влево, то при нажатии кнопки назад ничего не произойёт
            direction = 'left'
            steps = false
        } else if(e.keyCode == 38 && direction != 'down'){ // вверх и запрещаем движение в противоположную сторону
            direction = 'up'
            steps = false
        } else if(e.keyCode == 39 && direction != 'left'){ // вправо и запрещаем движение в противоположную сторону
            direction = 'right'
            steps = false
        } else if(e.keyCode == 40 && direction != 'up'){ // вниз и запрещаем движение в противоположную сторону
            direction = 'down'
            steps = false
}
}
})
// 