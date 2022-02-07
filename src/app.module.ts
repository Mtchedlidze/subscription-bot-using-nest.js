import { Module } from '@nestjs/common'
import { BotModule } from './bot/bot.module'
import { UsersModule } from './users/users.module'
import { TimeModule } from './time/time.module'
import { MomentModule } from '@ccmos/nestjs-moment'
import { MongooseModule } from '@nestjs/mongoose'
import { Cron, ScheduleModule } from '@nestjs/schedule'
import { CronModule } from './cron/cron.module'
import { WeatherModule } from './weather/weather.module'

@Module({
  imports: [
    BotModule,
    UsersModule,
    TimeModule,
    MongooseModule.forRoot(process.env.DB_URI),
    MomentModule.forRoot({
      tz: 'Europe/London',
    }),
    ScheduleModule.forRoot(),
    CronModule,
    WeatherModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
