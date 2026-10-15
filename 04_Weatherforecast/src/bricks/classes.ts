//classes for fetchLocation
export class FeatureCollection {
  features: Feature[];
}
export class Feature {
  properties: Properties;
}
export class Properties {
  lon: number;
  lat: number;
  formatted: string;
}
//--------------------
//classes for WeatherData
export class WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherListItem[];
  city: CityInfo;
}

export class WeatherListItem {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain?: Rain;
  sys: Sys;
  dt_txt: string;
}

export class Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export class Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export class Clouds {
  all: number;
}

export class Wind {
  speed: number;
  deg: number;
  gust: number;
}

export class Rain {
  ["3h"]: number;
}

export class Sys {
  pod: string;
}

export class CityInfo {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export class Coord {
  lat: number;
  lon: number;
}

