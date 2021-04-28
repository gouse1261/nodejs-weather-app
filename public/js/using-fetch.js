console.log('Hello Gouse!')

const weatherForm = document.querySelector('form');
const city = document.querySelector('input');

let errorMsg = document.querySelector('#errorMsg');
let weatherInfo = document.querySelector('#weatherInfo');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    errorMsg.textContent = 'Loading..';
    weatherInfo.textContent = '';
    fetch('http://localhost:3000/weather?city='+city.value).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                errorMsg.textContent = data.error;
                weatherInfo.textContent = '';
            } else {
                errorMsg.textContent = '';
                weatherInfo.textContent = data.forecast; 
            }
         })
     })
})