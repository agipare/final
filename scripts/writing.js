// select the elements to manipulate (output to)
const datefield = document.querySelector(".time");
const datefieldUK = document.querySelector("#lastupdate"); // for european/family history format with day first.

// derive the current date using a date object
const now = new Date();
const fulldate = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
    now
);
const fulldateUK = new Intl.DateTimeFormat("en-UK", {
    dateStyle: "full"
}).format(now);
// long, medium, short options ... try them

datefield.innerHTML = `<em>${fulldate}</em>`;
datefieldUK.innerHTML = `<em>${fulldateUK}</em>`;




// date and time 
const date = document.querySelector("#lastupdate");
try {
    const currentTime = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    date.innerHTML = new Date().toLocaleDateString('en-UK', currentTime);
} catch (e) {
    alert('Error with code or your browser does not support Locale');
}




//hamburger
function toggleMenu() {
    document.querySelector(".navigation").classList.toggle("open");
    document.querySelector(".hamb").classList.toggle("open");
}

const close = document.querySelector(".hamb");
close.onclick = toggleMenu;


//temples page
const display = document.querySelector("article");

// The following code could be written cleaner. How? We may have to simplfiy our HTMl 
//and think about a default view.
//json data fetch

const requestURL =  "./temple.json"
const card = document.querySelector('cards');

fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
        console.table(jsonObject);
        const temples = jsonObject['temples'];
        temples.forEach(displaytemples);
    });

function displaytemples(temple) {
    // Create elements to add to the document
    let card = document.createElement('section');
    let h2 = document.createElement('h2');
    let address = document.createElement('p');
    let portrait = document.createElement('img');
    let phone = document.createElement('p');
    let email = document.createElement('a');
    let services = document.createElement('p');
    let history = document.createElement('p');
    let temple_closure = document.createElement('p');
    let thumps = document.createElement('button');


    // Change the textContent property of the h2 element to contain the prophet's full name
    h2.textContent = `${temple.name} `;

    // Change the textContent property of the p element to contain the birth date and birth place 
    address.textContent = `Address - ${temple.address}`
    phone.textContent = `Phone - ${temple.phone}`
    email.textContent = `Email - ${temple.email}`
    services.textContent = `Sercvices - ${temple.services}`
    history.textContent = `History - ${temple.history}`
    temple_closure.textContent = ` Temple Closure - ${temple.closure}`

    // Build the images attributes by using the setAttribute method for the src, alt, and loading attribute values. (Fill in the blank with the appropiate variable).
    portrait.setAttribute('src', temple.imageurl);
    portrait.setAttribute('alt', `logo of  ${temple.name} ${temple.address}.`);
    portrait.setAttribute('loading', 'lazy');
    ///like button///
    let like = document.createElement('img');
    like.setAttribute('src','https://i.pinimg.com/originals/39/44/6c/39446caa52f53369b92bc97253d2b2f1.png');
    like.setAttribute('width','30px');
    like.setAttribute('lenght','20px');
    let count =  document.createElement('span')
    count.classList.add('count');
    count.textContent = '0';
    thumps.appendChild(like);
    thumps.appendChild(count);

    let clicked = false;
    thumps.addEventListener('click',() => {
        if (!clicked) {clicked = true;
        count.textContent++;
        return count}
        else{clicked = false; count.textContent--;}
        
    })
    Number(window.localStorage.setItem('like',count));
    
    //  Add/append the section(card) with the h2 element
    card.appendChild(h2);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(portrait);
    card.appendChild(email);
    card.appendChild(services);
    card.appendChild(history);
    card.appendChild(temple_closure);
    card.appendChild(thumps);
    

    // Add/append the existing HTML div with the cards class with the section(card)
    document.querySelector('article.cards').appendChild(card);

};



//Weather API//
// select HTML elements in the document
const currentTemp = document.querySelector('#temp');
const weatherIcon = document.querySelector('#weatherIcon');
const captionDesc = document.querySelector('figcaption');
const windspeed = document.querySelector('#windspeed');
const windchill = document.querySelector('#windchill');

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Bolgatanga&appid=594f2dd23e763ee93211dad5ba97fd06&units=imperial`;

async function apiFetch() {
    try {
      const response = await fetch(weatherUrl);
      if (response.ok) {
        const data = await response.json();
        console.log(data); // this is for testing the call
         displayResults(data);
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }
  
  apiFetch();

  function  displayResults(weatherData) {
    currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(0)}</strong>`;
  
    const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const desc = weatherData.weather[0].description;
  
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc;

    windspeed.innerHTML = `<strong>${weatherData.wind.speed}</strong>`;
  }