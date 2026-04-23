const { fetchWeatherAlerts } = require("../index");

global.fetch = jest.fn();

describe("fetchWeatherAlerts", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("fetch is called with correct API URL", async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          features: [
            { properties: { headline: "Test Alert 1" } },
            { properties: { headline: "Test Alert 2" } }
          ]
        })
    });

    await fetchWeatherAlerts("NY");

    expect(fetch).toHaveBeenCalledWith(
      "https://api.weather.gov/alerts/active?area=NY"
    );
  });
});
