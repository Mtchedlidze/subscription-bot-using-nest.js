import { HttpModule } from '@nestjs/axios'
import { Axios } from 'axios'
import { Module } from '@nestjs/common'
import { CronService } from './cron.service'
import { WeatherModule } from 'src/weather/weather.module'
import { TimeModule } from 'src/time/time.module'
import { UsersModule } from 'src/users/users.module'

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),

    WeatherModule,
    TimeModule,
    UsersModule,
  ],
  providers: [CronService, Axios],
})
export class CronModule {}
