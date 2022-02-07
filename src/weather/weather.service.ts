import { Injectable, Logger } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { lastValueFrom, map } from 'rxjs'

@Injectable()
export class WeatherService {
  private api: string
  private key: string
  constructor(private readonly httpService: HttpService) {
    this.api = process.env.WEATHER_API_URL
    this.key = process.env.OPENWEATHER_APIKEY
  }
  private async handleWeatherData(lon: number, lat: number) {
    try {
      return lastValueFrom(
        this.httpService
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.key}`,
          )
          .pipe(map((resp) => resp.data)),
      )
    } catch (error) {
      Logger.log(error)
    }
  }

  async getWeather(lon: number, lat: number) {
    const data = await this.handleWeatherData(lon, lat)

    if ('weather' in data) {
      const { weather } = data

      const weatherInfo = {
        weather: weather[0].description,
        city: data.name,
        temperature: data.main.temp,
      }
      return this.formatWeatherData(weatherInfo)
    }
  }

  private formatWeatherData(weatherInfo) {
    return `<b>Today is ${weatherInfo.weather} in <i>${weatherInfo.city}</i>, Temperature is ${weatherInfo.temperature} celsius</b>`
  }
}
