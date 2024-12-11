const getWeatherBtn = document.getElementById("getWeather");
const weatherDiv = document.getElementById("weather");

const apiKey = "04294fa91d7d6e6ffc0b901b910cfd20";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

getWeatherBtn.addEventListener("click", () => {
  const cityName = document.getElementById("city").value.trim();
  if (cityName === "") {
    weatherDiv.textContent = "Please enter the place name.";
    return;
  }

  const url = `${apiUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      // Update weather information
      weatherDiv.innerHTML = `
        <p><strong>City:</strong> ${data.name}</p>
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Pressure:</strong> ${data.main.pressure} hPa</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
      `;

      // Update background image without changing the opacity of text
      updateBackgroundImage(data.weather[0].main);
    })
    .catch((error) => {
      weatherDiv.textContent = error.message;
    });
});

function updateBackgroundImage(weatherMain) {
  const body = document.body;

  // Define mapping for weather conditions to images
  const weatherImages = {
    Clear: "img/sunny.jpg",
    Clouds: "img/cloudy.webp",
    Rain: "img/rainy.jpg",
    Snow: "img/snowy.jpg",
  };

  // Set the background image and maintain text opacity
  body.style.transition = "background-image 0.5s ease-in-out"; // Smooth transition effect
  body.style.backgroundImage = `url("${weatherImages[weatherMain]}")`;
  body.style.backgroundSize = "cover";
  body.style.opacity = "1"; // Ensure full opacity for text
}
