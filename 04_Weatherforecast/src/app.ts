import { FeatureCollection, Feature, WeatherData } from './bricks/classes';
import { ApiService } from './api-services';
import { autoinject, observable } from 'aurelia-framework';

@autoinject
export class App {
  weatherforecast = 'Weatherforecast';

  @observable
  currentInput = '';

  focusInput = false;
  locationSuggestions: Feature[] = [];
  weatherData: WeatherData;

  public icon: string = '';
  public iconUrl: string = '';
  public rain = 0;

  @observable
  selectedDate: string = '';
  @observable
  selectedTime: string = '';

  optionalTimes: string[] = [];
  uniqueDates: string[] = [];
  choosenIndex = 0;

  constructor(private apiService: ApiService) {
  }

  //input.delegate function to update input suggestions
  onInputChange(): void {
    if (this.currentInput.trim().length > 2) {
      this.fetchLocationdata();
    } else {
      console.log('empty');
    }
  }

  async fetchLocationdata(){
    const featureCollection:FeatureCollection = await this.apiService.getLocationSuggestions(this.currentInput);
    this.locationSuggestions = featureCollection.features;
    console.log('Standortdaten empfangen', this.locationSuggestions); 
  }

  async fetchWeatherdata(lon: number, lat: number) {
    this.weatherData = await this.apiService.getWeatherForecast(lon, lat);
    console.log('Wetterdaten empfangen:', this.weatherData);
    //select data of first weatherData entry
    this.icon = this.weatherData.list[this.choosenIndex].weather[0].icon;
    this.iconUrl =  `https://openweathermap.org/img/wn/${this.icon}@2x.png`; //(urls mit ${} in html ohne $)

    this.extrahendDates();
  }

  locationClick(location: Feature):void{
    this.currentInput = location.properties.formatted;
    
    //lon lat for fetchWeatherdata
    this.fetchWeatherdata(location.properties.lon, location.properties.lat);
    //to hide dropdown
    this.focusInput = false;
  }

  //to show dates and times seperately
  extrahendDates():void{
    const dates = this.weatherData.list.map(item => {
      // dates without times
      return item.dt_txt.split(' ')[0];
    });

    this.uniqueDates = Array.from(new Set(dates));

    this.selectedTime= this.weatherData.list[0].dt_txt.split(" ")[1].substring(0, 5);
  }

  selectedDateChanged():void{
    console.log(this.selectedDate);
    //to show optional times
    if(this.weatherData?.list){
      this.optionalTimes = this.weatherData.list
        .filter(item => item.dt_txt.startsWith(this.selectedDate)) //compare dates
        .map(item => item.dt_txt.split(' ')[1].slice(0, -3));
        //get weather for selected date & time
        this.getElementByDateTime();
    }
  }

  selectedTimeChanged():void{
    if(this.weatherData?.list){
      this.getElementByDateTime();
    }
  }

  //checks every weatherdata for selected date/time
  getElementByDateTime():void {
    for (let idx = 0; idx < this.weatherData.list.length; idx++) {
      if (this.weatherData.list[idx].dt_txt.includes(this.selectedDate.trim()) && this.weatherData.list[idx].dt_txt.includes(this.selectedTime.trim())) {
        this.choosenIndex = idx;  //selectedIndex

        // this.selectedTime= this.weatherData.list[this.choosenIndex].dt_txt.split(" ")[1].substring(0, 5);
        this.icon= this.weatherData.list[this.choosenIndex].weather[0].icon;
        this.iconUrl =  `https://openweathermap.org/img/wn/${this.icon}@2x.png`; 

        this.rain = 0;
        if(    this.weatherData.list[this.choosenIndex].rain &&
          this.weatherData.list[this.choosenIndex].rain["3h"] !== undefined)
          this.rain = this.weatherData.list[this.choosenIndex].rain["3h"];
        return;
      }
    }
  }
}



