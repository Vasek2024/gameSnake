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
function generateSnae() { // выдаёт два случайных значения Х и У
    let posX = Math.round(Math.random() * (10 - 1) + 1)
    let posY = Math.round(Math.random() * (10 - 1) + 1)
    return [posX, posY] // возвращаем массив случайных значения Х и У
}

let coordinates = generateSnae()
// находим три div с указанными координатами Х и У (тело змеи)
let snakeBody = [document.querySelector(`[posX = "` + coordinates[0] + `"][posY = "` + coordinates[1] + `"]`),
document.querySelector(`[posX = "` + (coordinates[0]-1) + `"][posY = "` + coordinates[1] + `"]`),
document.querySelector(`[posX = "` + (coordinates[0]-2) + `"][posY = "` + coordinates[1] + `"]`)]
// console.log(snakeBody)
for(let i = 0; i < snakeBody.length; i++){
    snakeBody[i].classList.add('snakeBody')
}
snakeBody[0].classList.add('head')