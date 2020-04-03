var name1 = "";
name1 = prompt("Введи имя");
localStorage.setItem("name1", JSON.stringify(name1));
document.cookie = "name=name1";
var arguments = [0,0,0,0,0];
var speed = 800;
function startGame(){
//Создаём поле
let tetris = document.createElement('div');
tetris.classList.add('tetris');
//Добавляем к тетрису ячейки
for (let i=1; i<181; i++) {
    let excel = document.createElement('div');
    excel.classList.add('excel');
    tetris.appendChild(excel);
}
//Разбиваем поле на ячейки
let main = document.getElementsByClassName('main')[0];
main.appendChild(tetris);
let excel = document.getElementsByClassName('excel');
let i = 0;
//Присваеваем каждой ячейке свою координату по x и y с пониженем ранга.
for (let y=18; y>0; y--) {
    for(let x=1; x<11; x++) {
        excel[i].setAttribute('posX', x);
        excel[i].setAttribute('posY', y);
        i++;
    }
}

let x = 5, y = 15;

let mainArr = [
    //палка
    [
        [0,1],
        [0,2],
        [0,3],
    //поворот палки на 90 градусов 
        [
            [-1,1],
            [0,0],
            [1,-1],
            [2,-2],
        ],
    //поворот палки на 180 градусов 
        [
            [1,-1],
            [0,0],
            [-1,1],
            [-2,2],
        ],
    //поворот палки на 270 градусов 
        [
            [-1,1],
            [0,0],
            [1,-1],
            [2,-2],
        ],
    //поворот палки на 360 градусов 
        [
            [1,-1],
            [0,0],
            [-1,1],
            [-2,2],
        ],
    ],
    //Квадрат
    [
        [1,0],
        [0,1],
        [1,1],
        //поворот Квадрат на 90 градусов 
        [
            [0,0],
            [0,0],
            [0,0],
            [0,0],
        ],
    //поворот Квадрат на 180 градусов 
        [
            [0,0],
            [0,0],
            [0,0],
            [0,0],
        ],
    //поворот Квадрат на 270 градусов 
        [
            [0,0],
            [0,0],
            [0,0],
            [0,0],
        ],
    //поворот Квадрат на 360 градусов 
        [
            [0,0],
            [0,0],
            [0,0],
            [0,0],
        ],
    ],
    //Бувка L
    [
        [1,0],
        [0,1],
        [0,2],
        //поворот Бувка L на 90 градусов 
        [
            [0,0],
            [-1,1],
            [1,0],
            [2,-1],
        ],
    //поворот Бувка L на 180 градусов 
        [
            [1,-1],
            [1,-1],
            [-1,0],
            [-1,0],
        ],
    //поворот Бувка L на 270 градусов 
        [
            [-1,0],
            [0,-1],
            [2,-2],
            [1,-1],
        ],
    //поворот Бувка L на 360 градусов 
        [
            [0,-1],
            [0,-1],
            [-2,0],
            [-2,0],
        ],
    ],
    //зеркало бувкы L
    [
        [1,0],
        [1,1],
        [1,2],
        //поворот зеркало бувкы L на 90 градусов 
        [
            [0,0],
            [0,0],
            [1,-1],
            [-1,-1],
        ],
    //поворот зеркало бувкы L на 180 градусов 
        [
            [0,-1],
            [-1,0],
            [-2,1],
            [1,0],
        ],
    //поворот зеркало бувкы L на 270 градусов 
        [
            [2,0],
            [0,0],
            [1,-1],
            [1,-1],
        ],
    //поворот зеркало бувкы L на 360 градусов 
        [
            [-2,0],
            [1,-1],
            [0,0],
            [-1,1],
        ],
    ],
    //Молния вправо
    [
        [1,0],
        [-1,1],
        [0,1],
    //поворот Молния вправо на 90 градусов 
        [
            [0,-1],
            [-1,0],
            [2,-1],
            [1,0],
        ],
    //поворот Молния вправо на 180 градусов 
        [
            [0,0],
            [1,-1],
            [-2,0],
            [-1,-1],
        ],
    //поворот Молния вправо на 270 градусов 
        [
            [0,-1],
            [-1,0],
            [2,-1],
            [1,0],
        ],
    //поворот Молния вправо на 360 градусов 
        [
            [0,0],
            [1,-1],
            [-2,0],
            [-1,-1],
        ],
    ],
    //Молния влево
    [
        [1,0],
        [1,1],
        [2,1],
        //поворот Молния влево на 90 градусов 
        [
            [2,-1],
            [0,0],
            [1,-1],
            [-1,0],
        ],
    //поворот Молния влево на 180 градусов 
        [
            [-2,0],
            [0,-1],
            [-1,0],
            [1,-1],
        ],
    //поворот Молния влево на 270 градусов 
        [
            [2,-1],
            [0,0],
            [1,-1],
            [-1,0],
        ],
    //поворот Молния влево на 360 градусов 
        [
            [-2,0],
            [0,-1],
            [-1,0],
            [1,-1],
        ],
    ],
    //Точка
    [
        [0,0],
        [0,0],
        [0,0],
        //поворотТочкавлево на 90 градусов 
        [
            [0,0],
            [0,0],
            [0,0],
            [0,0],
        ],
    //поворот Точка влево на 180 градусов 
        [
            [0,0],
            [0,0],
            [0,0],
            [0,0],
        ],
    //поворот Точка влево на 270 градусов 
        [
            [0,0],
            [0,0],
            [0,0],
            [0,0],
        ],
    //поворот Точка влево на 360 градусов 
        [
            [0,0],
            [0,0],
            [0,0],
            [0,0],
        ],
    ],
    //Деталь
    [
        [1,0],
        [2,0],
        [1,1],
    //поворот Деталь на 90 градусов 
        [
            [1,-1],
            [0,0],
            [0,0],
            [0,0],
        ],
    //поворот Деталь на 180 градусов 
        [
            [0,0],
            [-1,0],
            [-1,0],
            [1,-1],
        ],
    //поворот Деталь на 270 градусов 
        [
            [1,-1],
            [1,-1],
            [1,-1],
            [0,0],
        ],
    //поворот Деталь на 360 градусов 
        [
            [-2,0],
            [0,-1],
            [0,-1],
            [-1,-1],
        ],
    ]
]

let currentFigure = 0; //вспомогательная функция
let figureBody = 0;
let rotate = 1;

function create() {
    function getRandom() {
        return Math.round(Math.random()*(mainArr.length -1));
    }

    rotate = 1;
    currentFigure = getRandom();
    //Создание фигур по координатам
    figureBody = [
        document.querySelector(`[posX = "${x}"][posY = "${y}"]`),
        document.querySelector(`[posX = "${x + mainArr[currentFigure][0][0]}"][posY = "${y + mainArr[currentFigure][0][1]}"]`),
        document.querySelector(`[posX = "${x + mainArr[currentFigure][1][0]}"][posY = "${y + mainArr[currentFigure][1][1]}"]`),
        document.querySelector(`[posX = "${x + mainArr[currentFigure][2][0]}"][posY = "${y + mainArr[currentFigure][2][1]}"]`),
    ]
    for (let i=0; i<figureBody.length; i++) {
        figureBody[i].classList.add('figure');
    }

} 

create();
let score = 0;

let input = document.getElementsByTagName('input')[0];
input.value = `Ваши очки : ${score}`;
//логика падения фигур
function move(){
    let moveFlag = true;
    let coordinates = [
        [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')],
        [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')],
        [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')],
        [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')],
    ];
    //Обращение к первой строчке, если равна 0 запретить движение вниз или есть ли рядом 
    for (let i=0; i<coordinates.length; i++) {
        if (coordinates[i][1] == 1 || document.querySelector(`[posX = "${coordinates[i][0]}"][posY = "${coordinates[i][1]-1}"]`).classList.contains('set')) {
            moveFlag = false;
            break;
        }
    }


    if (moveFlag) {
        for (let i=0; i<figureBody.length; i++) {
            figureBody[i].classList.remove('figure');
        }
        figureBody = [
            document.querySelector(`[posX = "${coordinates[0][0]}"][posY = "${coordinates[0][1] -1}"]`),
            document.querySelector(`[posX = "${coordinates[1][0]}"][posY = "${coordinates[1][1] -1}"]`),
            document.querySelector(`[posX = "${coordinates[2][0]}"][posY = "${coordinates[2][1] -1}"]`),    
            document.querySelector(`[posX = "${coordinates[3][0]}"][posY = "${coordinates[3][1] -1}"]`),
        ];          
        for (let i=0; i<figureBody.length; i++) {
            figureBody[i].classList.add('figure');
        }

    } else {
        for (let i=0; i<figureBody.length; i++) {
            figureBody[i].classList.remove('figure');
            figureBody[i].classList.add('set');
        }      
        for (let i=1; i<15;i++){
            let count = 0;
            for(let k=1;k<11;k++){
                if (document.querySelector(`[posX= "${k}"][posY= "${i}"]`).classList.contains('set')){
                    count++;
                    if(count == 10){
                        score+=10;
                        if(score>10)
                        {
                            speed-400;
                        };
                        if(score>30)
                        {
                            speed-400;
                        };
                        if(score>50)
                        {
                            speed-400;
                        };
                        input.value = `Ваши очки : ${score}`;
                        for(let m=1;m<11;m++){
                            document.querySelector(`[posX= "${m}"][posY= "${i}"]`).classList.remove('set')
                        }
                        let set = document.querySelectorAll('.set');
                        let newSet = [];
                        for(let s=0;s<set.length;s++){
                            let setCoordinates = [set[s].getAttribute('posX'),set[s].getAttribute('posY')];
                            if(setCoordinates[1]>i){
                                set[s].classList.remove('set');
                                newSet.push(document.querySelector(`[posX= "${setCoordinates[0]}"][posY= "${setCoordinates[1]-1}"]`));
                            }
                        }
                        for(let a=0;a<newSet.length;a++){
                            newSet[a].classList.add('set');
                        }
                        i--;
                    }
                }
            }
        }
        let set = document.querySelectorAll('.set');
        for(let n=1;n<11;n++){
            if(document.querySelector(`[posX= "${n}"][posY= "15"]`).classList.contains('set')){
                var isResizeble = false;
                if(!isResizeble) {
                    clearInterval(interval);
                    isRezeble = true;
                }
                
                for(let n=1;n<set.length;n++){
                set[n].classList.remove('set'); //очистка координат
                }
                alert(`Конец игры. Ваши очки ${score}`);
                
                var storedNames = JSON.parse(localStorage.getItem("name1"));
                localStorage.setItem("score1", JSON.stringify(score));
                var storedScore = JSON.parse(localStorage.getItem("score1"));
                localStorage.setItem("highscore1",JSON.stringify(score))
                arguments[0]=storedScore; 
                console.log(arguments[0]=storedScore);
                    if(arguments[0] < storedScore)
                    {
                        arguments[0]=storedScore;
                        document.getElementById('hs1').innerHTML = storedScore;
                        document.getElementById('name1').innerHTML = storedNames;
                        score = 0;
                    }else if(arguments[0] == storedScore)
                    {
                        arguments[0]=storedScore;
                        document.getElementById('hs1').innerHTML = storedScore;
                        document.getElementById('name1').innerHTML = storedNames;
                        score = 0;
                    }
                    else if(arguments[1] == storedScore)
                    {
                        arguments[1]=storedScore;
                        document.getElementById('hs2').innerHTML = storedScore;
                        document.getElementById('name2').innerHTML = storedNames;
                        score = 0;
                    }else if(arguments[1] < storedScore)
                    {
                        arguments[2]=storedScore;
                        document.getElementById('hs3').innerHTML = storedScore;
                        document.getElementById('name3').innerHTML = storedNames;
                        score = 0;
                    }else if(arguments[2] < storedScore)
                    {
                        arguments[3]=storedScore;
                        document.getElementById('hs4').innerHTML = storedScore;
                        document.getElementById('name4').innerHTML = storedNames;
                        score = 0;
                    }else if(arguments[3] < storedScore)
                    {
                        arguments[4]=storedScore;
                        document.getElementById('hs5').innerHTML = storedScore;
                        document.getElementById('name5').innerHTML = storedNames;
                        score = 0;
                    }else
                    {
                        alert('Вы не попали в таблицу рекордов')
                    }
                    
                    break;
            } 
            
        }
        create(); 
        
    }
    
}
let interval = setInterval(() => {move();}, speed);



let flag = true;

window.addEventListener('keydown', function (e){

    let coordinates1 = [figureBody[0].getAttribute('posX'),figureBody[0].getAttribute('posY')];
    let coordinates2 = [figureBody[1].getAttribute('posX'),figureBody[1].getAttribute('posY')];
    let coordinates3 = [figureBody[2].getAttribute('posX'),figureBody[2].getAttribute('posY')];
    let coordinates4 = [figureBody[3].getAttribute('posX'),figureBody[3].getAttribute('posY')];

    function getNewState(a){

        flag = true;

        let figureNew = [
            document.querySelector(`[posX = "${+coordinates1[0] + a}"][posY = "${coordinates1[1]}"]`),
            document.querySelector(`[posX = "${+coordinates2[0] + a}"][posY = "${coordinates2[1]}"]`),
            document.querySelector(`[posX = "${+coordinates3[0] + a}"][posY = "${coordinates3[1]}"]`),
            document.querySelector(`[posX = "${+coordinates4[0] + a}"][posY = "${coordinates4[1]}"]`),
        ];

        for (let i=0; i<figureNew.length; i++){
            if(!figureNew[i] || figureNew[i].classList.contains('set')){
                flag = false;
            }
        }

        if(flag == true){
            for (let i=0; i<figureBody.length; i++) {
                figureBody[i].classList.remove('figure');
            }

            figureBody = figureNew;
            for (let i=0; i<figureBody.length; i++) {
                figureBody[i].classList.add('figure');
            }
        }

    }
    if(e.keyCode == 65){
        getNewState(-1);
    }else if(e.keyCode == 68){
        getNewState(1);
    }else if(e.keyCode == 83){
        move();
    }else if(e.keyCode == 87){
        flag = true;

        let figureNew = [
            document.querySelector(`[posX = "${+coordinates1[0] + mainArr[currentFigure][rotate+2][0][0]}"][posY = "${+coordinates1[1] + mainArr[currentFigure][rotate+2][0][1]}"]`),
            document.querySelector(`[posX = "${+coordinates2[0] + mainArr[currentFigure][rotate+2][1][0]}"][posY = "${+coordinates2[1] + mainArr[currentFigure][rotate+2][1][1]}"]`),
            document.querySelector(`[posX = "${+coordinates3[0] + mainArr[currentFigure][rotate+2][2][0]}"][posY = "${+coordinates3[1] + mainArr[currentFigure][rotate+2][2][1]}"]`),
            document.querySelector(`[posX = "${+coordinates4[0] + mainArr[currentFigure][rotate+2][3][0]}"][posY = "${+coordinates4[1] + mainArr[currentFigure][rotate+2][3][1]}"]`),
        ];

        for (let i=0; i<figureNew.length; i++){
            if(!figureNew[i] || figureNew[i].classList.contains('set')){
                flag = false;
            }
        }

        if(flag == true){
            for (let i=0; i<figureBody.length; i++) {
                figureBody[i].classList.remove('figure');
            }

            figureBody = figureNew;
            for (let i=0; i<figureBody.length; i++) {
                figureBody[i].classList.add('figure');
            }
            if (rotate <4){
                rotate++;
            }else{
                rotate = 1; 
            }
        }
    }

})
}
