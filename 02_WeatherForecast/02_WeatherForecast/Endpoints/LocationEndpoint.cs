using _02_Weatherforecast.Endpoints;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;

namespace WeatherAPI.Controllers;

[ApiController]
[Route("api/location")]
public class LocationController : ControllerBase
{

    private readonly HttpClient _httpClient;

    public LocationController(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    //[HttpGet]
    //public IEnumerable<Location> Get()
    //{
    //    var fakeData = new List<Location>
    //        {
    //            new Location { Name = "ahhl"  },
    //            new Location { Name = "ahhl" },
    //            new Location { Name = "ahhl"  }
    //        };

    //    return fakeData;
    //}


    [HttpGet("city/{cityName}")]
    public async Task<IActionResult> GetLocationSuggestions(string cityName)
    {
        try
        {
            string? apiKey = Environment.GetEnvironmentVariable("GEOAPIFY_API_KEY");
            

            if (string.IsNullOrEmpty(apiKey))
            {
                throw new InvalidOperationException("Geoapify API key is missing.");
            }

            string url = $"https://api.geoapify.com/v1/geocode/autocomplete?text={Uri.EscapeDataString(cityName)}&apiKey={apiKey}";

            // API-Aufruf
            var response = await _httpClient.GetAsync(url);

            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, "Fehler beim Abrufen der Standortdaten.");
            }

            var cityData = await response.Content.ReadAsStringAsync();

            var cityObject = JsonSerializer.Deserialize<FeatureCollection>(cityData);


            return Ok(cityObject);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Fehler: {ex.Message}");
        }
    }


}
public class FeatureCollection
{
    public List<Feature>? features { get; set; }
}

public class Feature
{
    public Properties? properties { get; set; }
}

public class Properties
{
    public double lon { get; set; }
    public double lat { get; set; }
    public string? formatted { get; set; }
}



