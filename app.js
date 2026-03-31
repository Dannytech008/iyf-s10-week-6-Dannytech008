const ONECALL_URL = "https://api.openweathermap.org/data/3.0/onecall";
const GEOCODE_URL = "https://api.openweathermap.org/geo/1.0/direct";
const OPENWEATHER_API_KEY = "bd1ef928ae878724423fdc2d55c1eb7e";
const HISTORY_STORAGE = "weather_recent_searches";
const MAX_HISTORY = 5;

const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const weatherDisplay = document.getElementById("weather-display");
const searchHistory = document.getElementById("search-history");

const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");

function titleCase(value) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function getHistory() {
  const raw = localStorage.getItem(HISTORY_STORAGE);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveHistory(city) {
  const normalized = titleCase(city);
  const current = getHistory().filter((item) => item.toLowerCase() !== normalized.toLowerCase());
  const updated = [normalized, ...current].slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_STORAGE, JSON.stringify(updated));
  renderHistory();
}

function renderHistory() {
  const items = getHistory();
  searchHistory.innerHTML = "";

  if (items.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.textContent = "No recent searches yet.";
    searchHistory.appendChild(emptyItem);
    return;
  }

  items.forEach((city) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "history-btn";
    btn.textContent = city;
    btn.addEventListener("click", () => {
      cityInput.value = city;
      getWeather(city);
    });

    li.appendChild(btn);
    searchHistory.appendChild(li);
  });
}

function showLoading() {
  loading.classList.remove("hidden");
  weatherDisplay.classList.add("hidden");
}

function hideLoading() {
  loading.classList.add("hidden");
}

function showError(message) {
  error.textContent = message;
  error.classList.remove("hidden");
}

function hideError() {
  error.textContent = "";
  error.classList.add("hidden");
}

function displayWeather(data, locationLabel) {
  cityName.textContent = locationLabel;
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
  weatherIcon.alt = data.current.weather[0].description;
  temperature.textContent = `${Math.round(data.current.temp)} C`;
  description.textContent = data.current.weather[0].description;
  feelsLike.textContent = `${Math.round(data.current.feels_like)} C`;
  humidity.textContent = `${data.current.humidity}%`;
  wind.textContent = `${data.current.wind_speed} m/s`;
  pressure.textContent = `${data.current.pressure} hPa`;
  weatherDisplay.classList.remove("hidden");
}

async function getCoordinates(city) {
  const query = encodeURIComponent(city.trim());
  const url = `${GEOCODE_URL}?q=${query}&limit=1&appid=${OPENWEATHER_API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch city coordinates.");
  }

  const locations = await response.json();
  if (!Array.isArray(locations) || locations.length === 0) {
    throw new Error("City not found. Try another city.");
  }

  return locations[0];
}

async function getWeather(city) {
  if (!OPENWEATHER_API_KEY || OPENWEATHER_API_KEY === "PASTE_YOUR_OPENWEATHER_API_KEY_HERE") {
    showError("Set your OpenWeatherMap API key in app.js before searching.");
    return;
  }

  try {
    showLoading();
    hideError();

    const location = await getCoordinates(city);
    const url = `${ONECALL_URL}?lat=${location.lat}&lon=${location.lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;

    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Invalid API key. Check your OpenWeather key.");
      }
      throw new Error("Failed to fetch weather data.");
    }

    const data = await response.json();
    const locationLabel = location.state
      ? `${location.name}, ${location.state}, ${location.country}`
      : `${location.name}, ${location.country}`;

    displayWeather(data, locationLabel);
    saveHistory(city);
  } catch (err) {
    showError(err.message || "Unexpected error occurred.");
  } finally {
    hideLoading();
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (!city) {
    return;
  }
  getWeather(city);
});

(function init() {
  renderHistory();
})();
