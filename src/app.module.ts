import { Module } from '@nestjs/common'
import { BotModule } from './bot/bot.module'
import { UsersModule } from './users/users.module'
import { TimeModule } from './time/time.module'
import { MomentModule } from '@ccmos/nestjs-moment'
@Module({
  imports: [
    BotModule,
    UsersModule,
    TimeModule,
    MomentModule.forRoot({
      tz: 'Europe/London',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
