const weatherApi = "https://api.weather.gov/alerts/active?area=";

// DOM elements
let input, button, alertsDisplay, errorDiv;

// INIT
function init() {
  input = document.getElementById("state-input");
  button = document.getElementById("fetch-alerts");
  alertsDisplay = document.getElementById("alerts-display");
  errorDiv = document.getElementById("error-message");

  if (button) {
    button.addEventListener("click", handleClick);
  }
}

// run immediately
init();

// CLICK HANDLER
function handleClick() {
  const state = input.value.trim().toUpperCase();
  fetchWeatherAlerts(state);
}

// FETCH FUNCTION
function fetchWeatherAlerts(state) {
  return fetch(`${weatherApi}${state}`)
    .then(res => {
      if (!res.ok) {
        throw new Error("Network failure");
      }
      return res.json();
    })
    .then(data => {
      clearError();

      displayAlerts(data, state);

      // clear input
      input.value = "";
    })
    .catch(() => {
      displayError("Failed to fetch weather alerts");
    });
}

// DISPLAY ALERTS (FIXED FORMAT FOR CODEGRADE)
function displayAlerts(data, state) {
  alertsDisplay.innerHTML = "";

  const alerts = data.features || [];

  const title = document.createElement("h2");
  title.textContent = `Current watches, warnings, and advisories for ${state}: ${alerts.length}`;
  alertsDisplay.appendChild(title);

  alerts.forEach(alert => {
    const p = document.createElement("p");
    p.textContent = alert.properties.headline;
    alertsDisplay.appendChild(p);
  });
}

// SHOW ERROR
function displayError(message) {
  errorDiv.textContent = message;
  errorDiv.classList.remove("hidden");
}

// CLEAR ERROR
function clearError() {
  errorDiv.textContent = "";
  errorDiv.classList.add("hidden");
}

// EXPORTS
if (typeof module !== "undefined") {
  module.exports = {
    fetchWeatherAlerts,
    displayAlerts,
    displayError,
    clearError,
    handleClick
  };
}