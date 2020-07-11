/* Global Variables */
//GET User Response from DOM:
const userResponse = document.getElementById('feelings');
const zipCode = document.getElementById('zip');
const generateBtn = document.getElementById('generate');


//API Info:
const apiKey = '40ccee278c384d0c3978732f2f4e9cac';
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?';


//Event Listner on Btn Click:
generateBtn.addEventListener('click',()=>{
    console.log(`zip is: ${zipCode.value}`);
    getData().then(temp =>{
    let data = {temperature:temp, userResponse:userResponse.value,newDate:newDate};
    postData('/add',data);
    draw(data);
    });
  
})

//Update UI dynamically:
function draw(data){
    const dateField = document.querySelector('div#date span');
    dateField.textContent = data.newDate;
    const tempField = document.querySelector('div#temp span');
    tempField.textContent = data.temperature;
    const feelingField = document.querySelector('div#content span');
    feelingField.textContent = data.userResponse;


}


//Get Data from OpenWeather API:
function getData (){
if(zipCode.value == ''){
    alert('Please Add a US ZipCode, Can not be empty')
}
else{
    //USING metric unit to get temp in Celsius: 
    return fetch(`${baseUrl}zip=${zipCode.value}&appid=${apiKey}&units=metric`).then((res)=> res.json())
    .then(resp =>{return resp.main.temp; })
}
}




// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//POST Data to Server:
async function postData (url, data = {}){
    const options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
        'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
     }
const response = await fetch(url, options);
const newData = await response.json();
}


