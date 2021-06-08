/* Global Variables */
const currentTemp = document.getElementById('temp');
const currentDate = document.getElementById('date');
const currentContent = document.getElementById('content');
const feelhtml = document.getElementById('feelings');
const zipCodehtml = document.getElementById('zip');
const apiKey = "1fc44fd832d6b4c6cdc7d9c983b1fb96";
const apiUrl = "http://localhost:3004";


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();



document.getElementById('generate').addEventListener('click', getInfo);
function getInfo() {
    let data = {
        myzip: zipCodehtml.value,
        myfeel: feelhtml.value,
        mydate: newDate
    };

    //if user didn't write empty zipcode
    if (!data.myzip) {
        alert("Please enter a valid zip code !!!!!!")
    }
    //go to open weather map to get the weather using zipcode
    weatherInfo(data.myzip, apiKey)
        //get the temperature and add it to data
        .then(weather => {
            data.mytemp = weather.main.temp;
            //saving data
            postData(data);
        })
        .then(data =>
            //updating ui for client
            updateUI()
        )
        .catch((error) => console.log('Something went wrong, ', error))
}
//get all information of open weather map
async function weatherInfo(zipcode, key) {
    return weather = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${apiKey}&units=metric`)).json()
}
// posting data to server to save it
async function postData(data) {
    //http:3004/postInfo
    let response = await fetch(`${apiUrl}/postInfo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}
/*Update UI after getting response with all required data */
async function updateUI() {
    //http:3004/all
    let response = await fetch(`${apiUrl}/all`);
    try {
        await response.json().then(data => {
            currentDate.innerHTML = `Your Date Is: ${data.date}`;
            currentTemp.innerHTML = `Temperature Is: ${data.temp}`;
            currentContent.innerHTML = `Your Feeling Is: ${data.content}`;
        })
            .catch((error) => console.log('Something went wrong, ', error));
    } catch (error) {
        console.log('Something went wrong, ', error);
    }
}
