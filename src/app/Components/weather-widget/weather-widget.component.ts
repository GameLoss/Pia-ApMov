import { Component, OnInit } from '@angular/core';

interface IDataResponse{
  min: number;
  max: number;
  actual: number;
  ciudad: string;
  icon: string;
}

export interface IApiIp {
  ip:                   string;
  version:              string;
  city:                 string;
  region:               string;
  region_code:          string;
  country:              string;
  country_name:         string;
  country_code:         string;
  country_code_iso3:    string;
  country_capital:      string;
  country_tld:          string;
  continent_code:       string;
  in_eu:                boolean;
  postal:               string;
  latitude:             number;
  longitude:            number;
  timezone:             string;
  utc_offset:           string;
  country_calling_code: string;
  currency:             string;
  currency_name:        string;
  languages:            string;
  country_area:         number;
  country_population:   number;
  asn:                  string;
  org:                  string;
}



export interface IApiWeather {
  coord:      Coord;
  weather:    Weather[];
  base:       string;
  main:       Main;
  visibility: number;
  wind:       Wind;
  clouds:     Clouds;
  dt:         number;
  sys:        Sys;
  timezone:   number;
  id:         number;
  name:       string;
  cod:        number;
}

export interface Clouds {
  all: number;
}

export interface Coord {
  lon: number;
  lat: number;
}

export interface Main {
  temp:       number;
  feels_like: number;
  temp_min:   number;
  temp_max:   number;
  pressure:   number;
  humidity:   number;
}

export interface Sys {
  type:    number;
  id:      number;
  country: string;
  sunrise: number;
  sunset:  number;
}

export interface Weather {
  id:          number;
  main:        string;
  description: string;
  icon:        string;
}

export interface Wind {
  speed: number;
  deg:   number;
}


@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss'],
})
export class WeatherWidgetComponent implements OnInit {

  WeatherData: IDataResponse;
  weatherInput: string = "";

  constructor() { }

  ngOnInit() {
    this.WeatherData=<IDataResponse>{};
    this.getIPData();
  }

  getIPData(){
    var IPData: string;
    fetch(`https://api64.ipify.org`)
    .then(response=>response.text())
    .then((data:string)=>{
      IPData = data;
      console.log(IPData);
      this.getIPCity(IPData);
    });
  }

  getIPCity(ip: string){
    var IPCity: string;
    fetch(`https://ipapi.co/${ip}/json/`)
    .then(response=>response.json())
    .then((data:IApiIp)=>{
      IPCity = data.city;
      console.log(IPCity);
      this.getWeatherData(IPCity);
    });
  }

  searchWeather(){
    if(this.weatherInput == ""){
      alert("Ingrese una ciudad");
    }
    else{
      this.getWeatherData(this.weatherInput);
    }
  }

  getWeatherData(city: string){
    this.WeatherData.ciudad = city;
    city = city.replace(/ /gi, "%20");
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},mx&appid=43b08b0f2e377cf57718309a81fef341`)
    .then(response=>response.json())
    .then((data:IApiWeather)=>{
      
      this.WeatherData.actual = Math.round(data.main.temp*1)/10;
      this.WeatherData.max = Math.round(data.main.temp_max*1)/10;
      this.WeatherData.min = Math.round(data.main.temp_min*1)/10;
      this.WeatherData.icon = this.getWeatherIcon(data.weather[0].main);

      console.log(this.WeatherData);
    });


  }

  getWeatherIcon(desc: string){
    var ico: string;
    switch(desc){
      case "Clouds":
        ico="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.newdesignfile.com%2Fpostpic%2F2009%2F10%2Fmostly-cloudy-weather-icon_79078.png&f=1&nofb=1";
        break;
      case "Clear":
        ico="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3.iconfinder.com%2Fdata%2Ficons%2Ftango-icon-library%2F48%2Fweather-clear-128.png&f=1&nofb=1";
        break;
      case "Haze":
        ico="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Ffiles.softicons.com%2Fdownload%2Fweb-icons%2Fandroid-weather-icons-by-bharath-prabhuswamy%2Fpng%2F128x128%2FHaze.png&f=1&nofb=1";
        break;
      case "Rain":
        ico="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3.iconfinder.com%2Fdata%2Ficons%2Fpicons-weather%2F57%2F15_heavy_rain-128.png&f=1&nofb=1";
        break;
      case "Thunderstorm":
        ico="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.flaticon.com%2Ficons%2Fpng%2F128%2F577%2F577584.png&f=1&nofb=1";
      break;

      default:
        ico="https://sheaworld.files.wordpress.com/2015/06/cpnext_emoticon_-_meh_face.png";
        break;
    }
    return ico;
  }

}
