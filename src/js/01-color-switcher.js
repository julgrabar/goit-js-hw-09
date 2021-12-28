const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    body: document.querySelector('body')
} 
let intervalId = null;
refs.startBtn.addEventListener('click',changeColor);
refs.stopBtn.addEventListener('click', stopChangeColor);
refs.stopBtn.disabled = true;
function changeColor(){
    const randomColor = getRandomHexColor();
    refs.body.style.backgroundColor = randomColor;
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
    intervalId = setInterval(()=>{
    const randomColor = getRandomHexColor();
    refs.body.style.backgroundColor = randomColor;
    },1000)
};
function stopChangeColor(){
    clearInterval(intervalId);
    refs.stopBtn.disabled = true;
    refs.startBtn.disabled = false;
};
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }