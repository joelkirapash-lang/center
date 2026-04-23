const weatherApi = "https://api.weather.gov/alerts/active?area=";

// State abbreviation → full name
const stateNames = {
  NY: "New York",
  CA: "California",
  TX: "Texas",
  FL: "Florida",
  WA: "Washington",
  IL: "Illinois",
  PA: "Pennsylvania",
  OH: "Ohio",
  GA: "Georgia",
  NC: "North Carolina",
  MI: "Michigan",
  NJ: "New Jersey",
  VA: "Virginia",
  AZ: "Arizona",
  MA: "Massachusetts",
  TN: "Tennessee",
  IN: "Indiana",
  MO: "Missouri",
  MD: "Maryland",
  WI: "Wisconsin",
  CO: "Colorado",
  MN: "Minnesota",
  SC: "South Carolina",
  AL: "Alabama",
  LA: "Louisiana",
  KY: "Kentucky",
  OR: "Oregon",
  OK: "Oklahoma",
  CT: "Connecticut",
  UT: "Utah",
  IA: "Iowa",
  NV: "Nevada",
  AR: "Arkansas",
  MS: "Mississippi",
  KS: "Kansas",
  NM: "New Mexico",
  NE: "Nebraska",
  WV: "West Virginia",
  ID: "Idaho",
  HI: "Hawaii",
  NH: "New Hampshire",
  ME: "Maine",
  MT: "Montana",
  RI: "Rhode Island",
  DE: "Delaware",
  SD: "South Dakota",
  ND: "North Dakota",
  AK: "Alaska",
  VT: "Vermont",
  WY: "Wyoming"
};

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

init();

// CLICK HANDLER
function handleClick() {
  const state = input.value.trim().toUpperCase();

  // Validate input
  if (state.length !== 2 || !/^[A-Z]+$/.test(state)) {
    displayError("Please enter a valid US state abbreviation (e.g. NY, CA)");
    return;
  }

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

// DISPLAY ALERTS
function displayAlerts(data, state) {
  alertsDisplay.innerHTML = "";

  const alerts = data.features || [];
  const fullState = stateNames[state] || state;

  const title = document.createElement("h2");
  title.textContent = `Current watches, warnings, and advisories for ${fullState}: ${alerts.length}`;
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

// EXPORTS (for tests)
if (typeof module !== "undefined") {
  module.exports = {
    fetchWeatherAlerts,
    displayAlerts,
    displayError,
    clearError,
    handleClick
  };
}