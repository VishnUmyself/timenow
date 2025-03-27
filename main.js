let timezone = "";
let cityName = "";
let cityDetails = "";

async function ipLocation() {
    let response = await fetch('https://thingproxy.freeboard.io/fetch/http://ip-api.com/json/');
    let obj = await response.json();

    let state = "";
    let countryFullName = "";

    cityName = obj.city;
    state = obj.regionName;  // Region can be the state or province
    countryFullName = obj.country;  // Full country name (e.g., United States)
    timezone = obj.timezone;  // Timezone (e.g., "America/New_York")
    
    cityDetails = `<p>Time in <a href = '${cityName}'>${cityName}, ${state}, ${countryFullName}</a> now:</p>`
}

async function currentTime(){
    //const apiKey = 'H7ZE405LMMJ3'
    const apiUrl = await fetch(`https://timeapi.io/api/Time/current/zone?timeZone=${encodeURIComponent(timezone)}`);

    let data = await apiUrl.json();

    const displayTime = new Date(data.dateTime);

    setInterval(() => {
        displayTime.setSeconds(displayTime.getSeconds() + 1);
        var time = displayTime.toLocaleTimeString([],{
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        document.querySelector('.section-2').innerHTML = `<h1>${time}</h1>`;
    }, 1000);
    
    var userTime = new Date();
    var zoneTime = new Date(data.dateTime);

    var timeDifference = Math.abs(userTime.getTime() - zoneTime.getTime());

    var differenceHours = Math.floor(timeDifference / (1000 * 60 * 60));
    var differenceMinutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    var differenceSeconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    var differenceMilliSeconds = Math.floor((timeDifference % 1000) / 100);

    let synchronization = (differenceSeconds/1000).toFixed(3)

    var differenceTime = ""

    if (differenceHours == 0 && differenceMinutes == 0 && differenceMinutes == 0 && differenceSeconds == 0) {
        differenceTime = (`0.${differenceMilliSeconds} seconds`)
    }
    else if (differenceHours == 0 && differenceMinutes == 0) {
        differenceTime = (`${differenceSeconds}.${differenceMilliSeconds} seconds`)
    } 
    else if (differenceHours == 0) {
        differenceTime = (`${differenceMinutes} minutes and ${differenceSeconds}.${differenceMilliSeconds} seconds`)
    }
    else{
        differenceTime = (`${differenceHours} hours and ${differenceMinutes} minutes and ${differenceSeconds}.${differenceMilliSeconds} seconds`)
    }


    if (userTime > zoneTime){
        document.querySelector('.section-1').innerHTML += (`<h4> Your Clock is ${differenceTime} ahead.</h4>`)
    }
    else if (userTime < zoneTime){
        document.querySelector('.section-1').innerHTML += (`<h4> Your Clock is ${differenceTime} behind.</h4>`)
    }
    else{
        document.querySelector('.section-1').innerHTML += (`<h4> Your Clock is equall.</h4>`)
    }

    document.querySelector('.section-1').innerHTML += `Accuracy of synchronization was ±${synchronization} seconds.`;
    document.querySelector('.section-1').innerHTML += `${cityDetails}`;

    const week = userTime.toLocaleDateString('en-IN', {weekday : 'long'});
    const month = userTime.toLocaleDateString('en-IN', {month:'long'})
    const date = userTime.getDate();
    const year = userTime.getFullYear();

    document.querySelector('.section-3').innerHTML = `<p id="date-details">${week}, ${date} ${month}, ${year}</p>`
    
}

async function sunRiseSunSet(){
    let key = "44bf8207618c6b90a9471ad31fc07862"
    let Url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`)
    let data = await Url.json();

    console.log(data)
    
    sunrise = data.sys.sunrise
    sunset = data.sys.sunset

    let sunriseDate = new Date(sunrise * 1000);
    let sunsetDate = new Date(sunset * 1000);

    let sunriseTime = sunriseDate.toLocaleTimeString().slice(0,4);
    let sunsetTime = sunsetDate.toLocaleTimeString().slice(0,4);

    daySun = sunriseDate - sunsetDate;
    let sunHours = Math.floor(Math.abs(daySun / (1000*60*60)));
    let sunMinutes = Math.floor(Math.abs(daySun % (1000*60*60) / (1000*60)));
    let sunTime = `${sunHours}h ${sunMinutes}m`
    
    document.querySelector('.section-3').innerHTML += `Sun: \u2191 ${sunriseTime} \u2193 ${sunsetTime} (${sunTime})`
}


async function getTime(){
    await ipLocation();
    await currentTime();
    await sunRiseSunSet();
}

getTime();

async function reloadPage(){
    location.reload();
}


// free time apiKey not required

// function time(){
//     const startTime = Date.now(); // Record start time

//     fetch('https://timeapi.io/api/Time/current/zone?timeZone=Asia/Kolkata')
//     .then(response => response.json())
//     .then(data => {
//         const endTime = Date.now(); // Record end time
//         const duration = endTime - startTime; // Calculate time taken

//         console.log(data);
//         console.log(`API request took ${duration/1000}ms`);

//         // You can process data here or use it as needed
//     })
//     .catch(error => {
//         console.error("Error fetching data:", error);
//     });
// }

// time();

// free location apiKey

// Function to fetch location details by city name using Nominatim API
// async function fetchLocationByCity(city) {
//     const url = `https://nominatim.openstreetmap.org/search?city=${city}&format=json&addressdetails=1`;

//     const response = await fetch(url);
//     const data = await response.json();

//       console.log(data);
// }

// let city = "Amadagur";
// fetchLocationByCity(city);

// //free sunrise sunset api
// function getTimeFromSunriseSunset() {
//     fetch('https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400')
//       .then(response => response.json())
//       .then(data => console.log(data))
  
//   }
  
//   getTimeFromSunriseSunset();

// async function ipLocation() {
//     let response = await fetch('https://ipinfo.io/json/');
//     let obj = await response.json();
//     console.log(obj)
//     timeZone = obj.timezone;
//     console.log(obj.city, obj.region, obj.country, obj.timezone)
// }



// async function getCityDetailsiqloc() {
//     let cityName = "kassamudram";
//     const apiKey = 'pk.06a028a87c79353708a44a5b648379a1'; // Replace with your API key
//     const endpoint = `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${cityName}&format=json&addressdetails=1`; //5000 req a day
  
//     const response = await fetch(endpoint);
//     const data = await response.json();
  
//     console.log(data);
  
//     const cityDetails = data[0];
  
//     // Update the UI with city details
//     let details = cityDetails.display_name;
  
//     let citydetails = {
//       name: details.split(",")[0],
//       mandal: details.split(",")[1],
//       district: details.split(",")[2]
//     };
//     console.log(citydetails);
  
//     console.log(cityDetails.lat);
//     console.log(cityDetails.lon);
//     console.log(cityDetails.address.country);
//     console.log(cityDetails.address.state);
//     console.log(cityDetails.address.postcode);
//   }
  
//   getCityDetailsiqloc();
  


// async function getCityDetailsopencage() {
//   // Get the city name from input
//   const cityName = "Kassamudram"
//   const apiKey = "c142637457a44d429e96add481a25461"; // replace with your Geonames username
//   const url = `https://api.opencagedata.com/geocode/v1/json?q=Frauenplan+1%2C+99423+Weimar%2C+${cityName}&key=${apiKey}`; //2500 req a day

//   const response = await fetch(url);
//   const data = await response.json();
//   console.log(data)
//   const location = data.results[0]; // Get the first result
//   console.log(location)
//     //Directly accessing the components without if statements
//     const state = location.components.state || "State not available";
//     const city = location.components.city || location.components.town || "City not available";
//     const country = location.components.country || "Country not available";
//     const timezone = location.annotations.timezone.name || "Timezone not available";

//     console.log(`City: ${city}`);
//     console.log(`State: ${state}`);
//     console.log(`Country: ${country}`);
//     console.log(`Timezone: ${timezone}`);

// }

// getCityDetailsopencage();



// const apiKey = 'vishnu_r'; // Use your Geonames username as the API key

// // Get place details from Geonames API
// async function getPlaceDetailsgeonames() {
//     const placeName = "kassamudram";
//     const url = `http://api.geonames.org/searchJSON?q=${placeName}&maxRows=10&username=${apiKey}`;

//     const response = await fetch(url);
//     const data = await response.json();

//     const place = data.geonames[0]; // Get the first result (you can loop if needed)

//     const placeDetails = {
//         name: place.name,
//         city: place.name,
//         county: place.adminName2, // County
//         state: place.adminName1,  // State
//         country: place.countryName,
//         latitude: place.lat,
//         longitude: place.lng
//     };

//             lat = placeDetails.latitude;
//             lon = placeDetails.longitude;
//             console.log(placeDetails.name, lat, lon);
       
// }



