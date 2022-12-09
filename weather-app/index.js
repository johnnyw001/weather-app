//This application allows a user to search for current weather data by entering in a city name (e.g. San Antonio), a city name seperated with a comma and a full state name (e.g. San Antonio, Texas), or a city name seperated with a comma and a two-letter country code (e.g. London, GB).

//This sections selects elements on the html page with the targeted classes and then adds an event listener for when the submit button is clicked. 
const form = document.querySelector(".top form");
const input = document.querySelector(".top input");
const msg = document.querySelector(".top .msg");
const list = document.querySelector(".card .cities");
const apiKey = '17f468b4729608724d38a55da4c16973';

//Event listener
form.addEventListener("submit", e => {
  e.preventDefault();
  let inputVal = input.value;

  // This sections calls the OpenWeather API using an assigned API key and gets current weather information for the specified city using the fetch api.

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=imperial`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { main, name, sys, weather } = data;
      const { description, icon } = data.weather[0];
      const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

      //This section takes the data recieved from the calling the API, create the weather cards and appends the applicable data to those card.

      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°F</sup></div>
        <figure>
          <img class="city-icon" src="${iconUrl}" alt="${weather[0]["description"]
        }">
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;
      li.innerHTML = markup;
      list.appendChild(li);
    })
    //If the user does not enter a valid city, state, or country code name, this error message will be displayed below the search field of the form.
    .catch(() => {
      msg.textContent = "Please enter a valid city name, city name with full state name seperated with a comma, or city name with two-letter country code";
    });
  // This section resets the search form field after each search has been completed, clears any error messages, and applies focus to the search field. 
  msg.textContent = "";
  form.reset();
  input.focus();
});
