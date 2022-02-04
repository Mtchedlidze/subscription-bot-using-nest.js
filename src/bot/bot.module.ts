import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TelegrafModule } from 'nestjs-telegraf'
import { TimeModule } from 'src/time/time.module'
import { UsersModule } from 'src/users/users.module'
import { WeatherBot } from './bot.service'
import { Reply } from './commands/reply.bot'

@Module({
  imports: [
    TimeModule,
    ConfigModule.forRoot(),
    UsersModule,
    TelegrafModule.forRoot({
      token: process.env.TOKEN,
    }),
  ],
  providers: [WeatherBot],
})
export class BotModule {}
