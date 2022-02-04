import { Module } from '@nestjs/common'
import { BotModule } from './bot/bot.module'
import { UsersModule } from './users/users.module'
import { TimeModule } from './time/time.module'
import { MomentModule } from '@ccmos/nestjs-moment'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    BotModule,
    UsersModule,
    TimeModule,
    MongooseModule.forRoot(process.env.DB_URI),
    MomentModule.forRoot({
      tz: 'Europe/London',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
