const weatherApi = "https://api.weather.gov/alerts/active?area=";

let input, button, alertsDisplay, errorDiv;

function init() {
  input = document.getElementById("state-input");
  button = document.getElementById("fetch-alerts");
  alertsDisplay = document.getElementById("alerts-display");
  errorDiv = document.getElementById("error-message");

  if (button) {
    button.addEventListener("click", handleClick);
  }
}

init();

function handleClick() {
  const state = input.value.trim().toUpperCase();
  fetchWeatherAlerts(state);
}

function fetchWeatherAlerts(state) {
  return fetch(`${weatherApi}${state}`)
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch weather alerts");
      return res.json();
    })
    .then(data => {
      displayAlerts(data);
      clearError();
      input.value = "";
    })
    .catch(err => {
      displayError(err.message);
    });
}

function displayAlerts(data) {
  alertsDisplay.innerHTML = "";

  const alerts = data.features || [];

  const title = document.createElement("h2");
  title.textContent = `Current watches, warnings, and advisories for ${input.value.toUpperCase()}: ${alerts.length}`;

  alertsDisplay.appendChild(title);

  alerts.forEach(alert => {
    const p = document.createElement("p");
    p.textContent = alert.properties.headline;
    alertsDisplay.appendChild(p);
  });
}

function displayError(message) {
  errorDiv.textContent = message;
  errorDiv.classList.remove("hidden");
}

function clearError() {
  errorDiv.textContent = "";
  errorDiv.classList.add("hidden");
}

if (typeof module !== "undefined") {
  module.exports = {
    fetchWeatherAlerts,
    displayAlerts,
    displayError,
    clearError,
    handleClick
  };
}