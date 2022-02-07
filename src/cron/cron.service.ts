import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { map, lastValueFrom } from 'rxjs'
import { TimeService } from 'src/time/time.service'
import { UsersService } from 'src/users/users.service'
import { WeatherService } from 'src/weather/weather.service'
process.env.TZ = 'Europe/London'
@Injectable()
export class CronService {
  url: string
  constructor(
    private readonly httpService: HttpService,
    private readonly usersService: UsersService,
    private readonly timeService: TimeService,
    private readonly weatherService: WeatherService,
  ) {
    this.url = process.env.TELEGRAM_API_URL
  }

  private checkUser() {
    const timeNow = this.timeService.formatTime(new Date())
    return this.usersService.findUsers(timeNow)
  }

  private async sendMessage() {
    const users = await this.checkUser()

    if (users.length > 0) {
      users.map(async (user) => {
        const { location } = user
        const weather = await this.weatherService.getWeather(
          location.longitude,
          location.latitude,
        )

        lastValueFrom(
          this.httpService
            .post(this.url, {
              text: weather,
              chat_id: user.chatID,
            })
            .pipe(map((resp) => resp.data)),
        )
      })
    }
  }

  @Cron('* * * * *')
  async handle() {
    await this.sendMessage()
  }
}
