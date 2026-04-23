const weatherApi = "https://api.weather.gov/alerts/active?area=";

// DOM elements
let input, button, alertsDisplay, errorDiv;

// -------------------------
// INIT (browser only)
// -------------------------
function init() {
  input = document.getElementById("state-input");
  button = document.getElementById("fetch-alerts");
  alertsDisplay = document.getElementById("alerts-display");
  errorDiv = document.getElementById("error-message");

  if (button) {
    button.addEventListener("click", handleClick);
  }
}

// Only run init in browser (NOT in Jest)
if (typeof window !== "undefined") {
  init();
}

// -------------------------
// CLICK HANDLER
// -------------------------
function handleClick() {
  const state = input.value.trim().toUpperCase();
  fetchWeatherAlerts(state);
}

// -------------------------
// FETCH FUNCTION
// -------------------------
function fetchWeatherAlerts(state) {
  return fetch(`${weatherApi}${state}`)
    .then(res => {
      if (!res.ok) {
        throw new Error("Network failure");
      }
      return res.json();
    })
    .then(data => {
      displayAlerts(data);
      clearError();

      // clear input
      if (input) input.value = "";
    })
    .catch(err => {
      displayError(err.message);
    });
}

// -------------------------
// DISPLAY ALERTS
// -------------------------
function displayAlerts(data) {
  if (!alertsDisplay) return;

  alertsDisplay.innerHTML = "";

  const alerts = data.features || [];

  const title = document.createElement("h2");
  title.textContent = `Weather Alerts: ${alerts.length}`;
  alertsDisplay.appendChild(title);

  alerts.forEach(alert => {
    const p = document.createElement("p");
    p.textContent = alert.properties.headline;
    alertsDisplay.appendChild(p);
  });
}

// -------------------------
// ERROR HANDLING
// -------------------------
function displayError(message) {
  if (!errorDiv) return;

  errorDiv.textContent = message;
  errorDiv.classList.remove("hidden");
}

function clearError() {
  if (!errorDiv) return;

  errorDiv.textContent = "";
  errorDiv.classList.add("hidden");
}

// -------------------------
// EXPORTS (for Jest tests)
// -------------------------
if (typeof module !== "undefined") {
  module.exports = {
    fetchWeatherAlerts,
    displayAlerts,
    displayError,
    clearError,
    handleClick
  };
}