import Notiflix from 'notiflix';
const form = document.querySelector('form');
let position = 1;
let delay = null;
let amount = null;
let step = null;
form.addEventListener('submit', onBtnSubmit);
function onBtnSubmit(event){
  event.preventDefault();
  
  step = Number(event.currentTarget.step.value);
  delay = Number(event.currentTarget.delay.value);
  amount = Number(event.currentTarget.amount.value);
  setInterval(()=>{
    if(position>amount){
     
      return;
    } else {
    createPromise(position, delay)
    .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);})
    .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  position+=1;
  delay+=step;
  } },0) 
  position = 1
}

function createPromise(position,delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve,reject)=>{
   setTimeout(()=>{
    if (shouldResolve) {
    resolve({position,delay});
  } else {
    reject({position,delay});
  }},delay) 
  })
}

