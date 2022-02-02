import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TelegrafModule } from 'nestjs-telegraf'
import { TimeModule } from 'src/time/time.module'
import { BotService } from './bot.service'

@Module({
  imports: [
    BotModule,
    TimeModule,
    ConfigModule.forRoot(),
    TelegrafModule.forRoot({
      token: process.env.TOKEN,
    }),
  ],
  providers: [BotService],
})
export class BotModule {}
