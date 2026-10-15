import { HttpClient } from 'aurelia-fetch-client';
import { autoinject } from 'aurelia-framework';
import { FeatureCollection, WeatherData } from 'bricks/classes'; 

@autoinject
export class ApiService {
  constructor(private httpClient: HttpClient) {
    this.httpClient.configure(config => {
      const baseUrl = window.location.protocol === 'https:' 
        ? 'https://localhost:7108/' 
    : 'http://localhost:5118/';
      config.withBaseUrl(baseUrl); // base-URL API
    });
  }

  async getLocationSuggestions(currentInput: string): Promise<FeatureCollection>{
    try {
      const response = await this.httpClient.fetch(`api/location/city/${encodeURIComponent(currentInput)}`); //(backticks statt Anführungszeichen!!!)
      console.log('answ:', response);
      if (!response.ok) {
        throw new Error(`HTTP-Error: ${response.status}`);
      }
      return await response.json() as FeatureCollection; // deserialize in FeatureCollection
    } catch (error) {
      console.error('Fehler beim Abrufen der Daten in ApiService:', error);
      throw error;
    }
  }

  async getWeatherForecast(longitude: number, latitude: number): Promise<WeatherData> {
    try {
      const response = await this.httpClient.fetch(`api/weather/city/${encodeURIComponent(longitude)}/${encodeURIComponent(latitude)}`);
      console.log('answ:', response);
      if (!response.ok) {
        throw new Error(`HTTP-Error: ${response.status}`);
      }
      return await response.json() as WeatherData; // deserialize data in Weatherdata
    } catch (error) {
      console.error('Fehler beim Abrufen der Daten in ApiService:', error);
      throw error;
    }
  }
}





