using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Text.Json;
using System.Text.Json.Serialization;
using OpenWeatherMap;

namespace _02_Weatherforecast.Endpoints
{
    [ApiController]
    [Route("api/weather")]
    public class WeatherForecastController : ControllerBase
    {

        private readonly HttpClient _httpClient;

        public WeatherForecastController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        [HttpGet("city/{longitude}/{latitude}")]
        public async Task<IActionResult> GetWeatherForCity(double longitude, double latitude)
        {
            try
            {
                string? apiKey = Environment.GetEnvironmentVariable("OPENWEATHER_API_KEY");

                if (string.IsNullOrEmpty(apiKey))
                {
                    throw new InvalidOperationException("OpenWeather API key is missing.");
                }

                string url = $"https://api.openweathermap.org/data/2.5/forecast?lat={latitude}&lon={longitude}&appid={apiKey}&lang=de&units=metric";

                // API-Call
                var response = await _httpClient.GetAsync(url);

                if (!response.IsSuccessStatusCode)
                {
                    return StatusCode((int)response.StatusCode, "Fehler beim Abrufen der Wetterdaten.");
                }

                //parse JSON-Answer
                var weatherData = await response.Content.ReadAsStringAsync();

                var weatherObject = JsonSerializer.Deserialize<WeatherData>(weatherData);
       
                return Ok(weatherObject);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Fehler: {ex.Message}");
            }
        }
    }

    public class WeatherData
    {
        public string? cod { get; set; }
        public int message { get; set; }
        public int cnt { get; set; }
        public List<WeatherListItem>? list { get; set; }
        public CityInfo? city { get; set; }
    }

    public class WeatherListItem
    {
        public long dt { get; set; }
        public Main? main { get; set; }
        public List<Weather>? weather { get; set; }
        public Clouds? clouds { get; set; }
        public Wind? wind { get; set; }
        public int visibility { get; set; }
        public double pop { get; set; }
        public Rain? rain { get; set; }
        public Sys? sys { get; set; }
        public string? dt_txt { get; set; }
    }

    public class Main
    {
        public double temp { get; set; }
        public double feels_like { get; set; }
        public double temp_min { get; set; }
        public double temp_max { get; set; }
        public int pressure { get; set; }
        public int sea_level { get; set; }
        public int grnd_level { get; set; }
        public int humidity { get; set; }
        public double temp_kf { get; set; }
    }

    public class Weather
    {
        public int id { get; set; }
        public string? main { get; set; }
        public string? description { get; set; }
        public string? icon { get; set; }
    }

    public class Clouds
    {
        public int all { get; set; }
    }

    public class Wind
    {
        public double speed { get; set; }
        public int deg { get; set; }
        public double gust { get; set; }
    }

    public class Rain
    {
        [JsonPropertyName("3h")]
        public double ThreeH { get; set; }
    }

    public class Sys
    {
        public string? pod { get; set; }
    }

    public class CityInfo
    {
        public int id { get; set; }
        public string? name { get; set; }
        public Coord? coord { get; set; }
        public string? country { get; set; }
        public int population { get; set; }
        public int timezone { get; set; }
        public long sunrise { get; set; }
        public long sunset { get; set; }
    }

    public class Coord
    {
        public double lat { get; set; }
        public double lon { get; set; }
    }

}


