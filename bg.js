const body = document.querySelector("body");

const IMG_NUMBER = 3;

function paintImage(imgNumber){
    const image = new Image();
    image.src = `./images/${imgNumber + 1}.jpg`
    image.classList.add("bgImage"); 
    body.appendChild(image);
}

function genRandom(){
    const number = Math.floor(Math.random()*IMG_NUMBER); // floor: 버림 / 0~3미만의 정수
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber)
}

init();